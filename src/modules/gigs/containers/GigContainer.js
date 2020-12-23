import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withDataTable, documentTitle} from '../../../support/hocs/index';
import {destroy, getRecords, isApproved} from '../redux/actions';
import {selectDeleteRequest, selectGetRecordsRequest, selectIsApprovedRequest} from '../redux/selectors';
import {
  ConfirmButton,
  DatePicker,
  Pagination,
  PerPageSelector,
  SimpleImageViewer,
  SortableTh,
  TextField
} from '../../ui/components/index';
import {Button, Card, CardBody, Col, Row, Table} from 'reactstrap';
import {humanize, humanizeDate, humanizeTime} from '../../../support/helpers/moment';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import env from "../../../configs/app";
import Switch from 'react-switch';

@connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    isApprovedRequest: selectIsApprovedRequest(state),
    deleteRequest: selectDeleteRequest(state)
  }),
  {
    getRecords, destroy, isApproved
  }
)
@withDataTable
@documentTitle('Users')
export default class GigContainer extends Component {
  state = {
    createModalIsOpen: false,
    editModalIsOpen: false,
    userToEdit: null,
    visible: false,
    posterUrl: ''
  };

  componentDidMount() {
    const {getRecords} = this.props;
    getRecords();
  }

  componentWillReceiveProps(nextProps) {
    this.handleDeleteSuccess(nextProps);
  }

  toggleCreateModal() {
    const {createModalIsOpen} = this.state;
    this.setState({
      createModalIsOpen: !createModalIsOpen
    });
  }

  toggleEditModal() {
    const {editModalIsOpen, userToEdit} = this.state;
    this.setState({
      editModalIsOpen: !editModalIsOpen,
      userToEdit: !editModalIsOpen ? userToEdit : null
    });
  }

  toggleIsApproved(id) {
    this.props.isApproved(id);
  }

  editUser(user) {
    this.setState({
      editModalIsOpen: true,
      userToEdit: user
    });
  }

  recordRenderer(record, key) {
    const {destroy, deleteRequest} = this.props;
    const {id, name, description, startsAt, venue, endsAt, price, owner, artists, types, isApproved, createdAt, poster} = record;

    const firstArtist = artists.toJS().map(function (gigArtists) {
      return gigArtists.artist.name;
    });

    const gigUrl = 'http://tonightsgigs.myemo.am/gig/'+firstArtist.shift()+'-'+venue.get('name')+'-'+id;

    console.log(firstArtist.shift(), venue.get('name'), id);
    return (
      <tr key={key}>
        <td>
          {poster &&
          <SimpleImageViewer
            visible={this.state.visible}
            onClose={() => {
              this.setState({visible: false});
            }}
            images={[{src: this.state.posterUrl, alt: ''}]}
          />}

          <span>
            <img onClick={() => {
              window.open(gigUrl.replace(/\s+/, ""), '_blank');
              // if (poster) {
              //   this.setState({visible: !this.state.visible});
              //   this.setState({posterUrl: poster.get('original')});
              // }
            }}
             height='60'
             width='60'
             onError={(event)=>event.target.setAttribute("src", env.API_STORAGE_URL + '/tmp/default-avatar.png')}
             alt='Not Found'
             src={poster ? poster.get('sm') : env.API_STORAGE_URL + '/tmp/default-avatar.png'}/>
          </span>
        </td>
        <td>{name}</td>
        {/*<td>{description}</td>*/}
        {/*<td>{humanizeTime(startsAt)}</td>*/}
        {/*<td>{humanizeTime(endsAt)}</td>*/}
        <td>
          <sapn>{humanizeDate(startsAt)}</sapn><br/>
          <b>Starts at - {humanizeTime(startsAt)}</b><br/>
          <b>Ends at - {humanizeTime(endsAt)}</b>
        </td>
        <td>{'$'+price}</td>
        <td>{artists ? artists.map(function (element) {
          return element.getIn(['artist', 'name']);
        }).join(', ') : ''}</td>
        <td>{types ? types.join(', ') : ''}</td>
        <td>{humanize(createdAt)}</td>
        <td>
          <Switch
            onChange={() => this.toggleIsApproved(id)}
            checked={isApproved}
            disabled={isApproved}
            id={'' + id}
            onColor='#888888'
            uncheckedIcon={
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "orange",
                paddingRight: 2
              }}>
              No
              </div>
            }
            checkedIcon={
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: 'orange',
                paddingRight: 2
              }}>
              Yes
              </div>
            }
          />
        </td>
        <td width='4%'>
          <ConfirmButton
            expand={false}
            loading={deleteRequest.get('loading') && deleteRequest.get('id') === id}
            onClick={() => {
              destroy(owner.get('id'), id)
            }}
            type='button'
            color='danger'>
            <i className='fa fa-trash'/>
          </ConfirmButton>
        </td>
      </tr>
    );
  }

  handleCreateSuccess() {
    const {
      goToPage, totalPages,
      perPage, totalRecords
    } = this.props;

    if (totalRecords % perPage === 0) {
      goToPage(totalPages + 1, true, true);
    } else {
      goToPage(totalPages, true, true);
    }
  }

  handleUpdateSuccess() {
    this.props.getRecords();
  }

  handleDeleteSuccess(nextProps) {
    const {success} = this.props.deleteRequest;
    const {success: nextSuccess} = nextProps.deleteRequest;

    if (!success && nextSuccess) {
      this.props.getRecords();
    }
  }

  render() {
    const {createModalIsOpen, editModalIsOpen, userToEdit} = this.state;
    const {
      renderRecords,
      hardSort, sorters,
      filter, filterEvent, filters, resetFilters,
      showFilters, toggleFilters,
      page, totalPages, goToPage,
      perPage, changePerPage
    } = this.props;

    return (
      <Row>
        <Col lg='12'>
          <Card>
            <CardBody>
              <div className='table-helpers'>
                <PerPageSelector current={perPage} onSelect={changePerPage}/>
                <div className='action-buttons'>
                  {/*<Button outline color='primary' onClick={::this.toggleCreateModal}>Add new User</Button>*/}
                  <Button outline color='primary' onClick={toggleFilters} className='pull-right'><i
                    className='fa fa-filter'/></Button>
                </div>
              </div>
              <Table className='table table-bordered' style={{position: 'relative'}} hover bordered striped responsive>
                <thead>
                <tr hidden={showFilters}>
                  <th></th>
                  <th>
                    <TextField
                      placeholder='Username'
                      value={filters.get('name')}
                      name='name'
                      onChange={filterEvent}/>
                  </th>

                  <th>
                    <Row>
                      <Col sm={12} style={{zIndex: 1000, display: 'flex'}}>
                        <DatePicker
                          placeholder='Starts At From'
                          value={filters.getIn(['startsAt', 'from'])}
                          name='startsAt.from'
                          onChange={filter}/>
                        <span> - </span>
                        <DatePicker
                          placeholder='Starts At To'
                          value={filters.getIn(['startsAt', 'to'])}
                          name='startsAt.to'
                          onChange={filter}/>
                      </Col>
                    </Row>
                  </th>
                  <th>
                    <Row>
                      <Col sm={12} style={{display: 'flex'}}>
                        <TextField
                          type='number'
                          placeholder='Min. Price'
                          value={filters.getIn(['price', 'min'])}
                          name='price.min'
                          onChange={filterEvent}/>
                        <span> - </span>
                        <TextField
                          type='number'
                          placeholder='Max. Price'
                          value={filters.getIn(['price', 'max'])}
                          name='price.max'
                          onChange={filterEvent}/>
                      </Col>
                    </Row>
                  </th>
                  <th>
                    <TextField
                      placeholder='Address'
                      value={filters.get('address')}
                      name='address'
                      onChange={filterEvent}/>
                  </th>
                  <th>
                    {/*<TextField*/}
                      {/*placeholder='type'*/}
                      {/*value={filters.get('type')}*/}
                      {/*name='type'*/}
                      {/*onChange={filterEvent}/>*/}
                  </th>
                  <th>
                    <Row>
                      <Col sm={12} style={{zIndex: 1000,display: 'flex'}}>
                        <DatePicker
                          placeholder='Created At From'
                          value={filters.getIn(['createdAt', 'from'])}
                          name='createdAt.from'
                          onChange={filter}/>
                        <span> - </span>
                        <DatePicker
                          placeholder='Created At To'
                          value={filters.getIn(['createdAt', 'to'])}
                          name='createdAt.to'
                          onChange={filter}/>
                      </Col>
                    </Row>
                  </th>
                  <th></th>
                  <th className='valign-top'>
                    <Button onClick={resetFilters} color='danger'><i className='fa fa-times'/></Button>
                  </th>
                </tr>
                <tr>
                  <th width='10%'>Poster</th>
                  <SortableTh width='20%' name='name' onSort={hardSort} sorters={sorters}>Gig name</SortableTh>
                  {/*<th width='10%'>Description</th>*/}
                  <SortableTh width='12%' name='startsAt' onSort={hardSort} sorters={sorters}>Date</SortableTh>
                  <SortableTh width='12%' name='price' onSort={hardSort} sorters={sorters}>Price</SortableTh>

                  <th width='10%'>Artists</th>
                  <th width='10%'>Type</th>
                  <SortableTh width='10%' name='createdAt' onSort={hardSort} sorters={sorters}>Created At</SortableTh>
                  <th width='7%'>Approved</th>
                  <th width='5%'>Actions</th>
                </tr>
                </thead>

                <tbody>
                {renderRecords(::this.recordRenderer)}
                </tbody>
              </Table>

              <Pagination className='pull-right' current={page} totalPages={totalPages} onPageSelect={goToPage}/>
            </CardBody>
          </Card>
        </Col>

        <CreateUserModal
          isOpen={createModalIsOpen}
          toggle={::this.toggleCreateModal}
          onSuccess={::this.handleCreateSuccess}/>

        <EditUserModal
          isOpen={editModalIsOpen}
          user={userToEdit}
          toggle={::this.toggleEditModal}
          onSuccess={::this.handleUpdateSuccess}/>
      </Row>
    );
  }
}