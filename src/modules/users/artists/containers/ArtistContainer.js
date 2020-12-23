import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withDataTable, documentTitle} from '../../../../support/hocs/index';
import {destroy, getRecords} from '../redux/actions';
import {selectDeleteRequest, selectGetRecordsRequest} from '../redux/selectors';
import {
  ConfirmButton,
  DatePicker,
  Pagination,
  PerPageSelector,
  SimpleImageViewer,
  SortableTh,
  TextField
} from '../../../ui/components/index';
import {Button, Card, CardBody, Col, Row, Table} from 'reactstrap';
import {humanize} from '../../../../support/helpers/moment';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import env from "../../../../configs/app";

@connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    deleteRequest: selectDeleteRequest(state)
  }),
  {
    getRecords, destroy
  }
)
@withDataTable
@documentTitle('Users')
export default class ArtistContainer extends Component {
  state = {
    createModalIsOpen: false,
    editModalIsOpen: false,
    userToEdit: null,
    visible: false,
    avatarUrl: ''
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

  editUser(user) {
    this.setState({
      editModalIsOpen: true,
      userToEdit: user
    });
  }

  recordRenderer(record, key) {
    const {destroy, deleteRequest} = this.props;
    const {id, name, createdAt, avatar, website, address, contactMobile, genres} = record;

    return (
      <tr key={key}>
        <td width='5%'>
          {avatar &&
          <SimpleImageViewer
            visible={this.state.visible}
            onClose={() => {
              this.setState({visible: false});
            }}
            images={[{src: this.state.avatarUrl, alt: 'Image not found.'}]}
          />}

          <span className='zoom-in'>
              <img onClick={() => {
                if (avatar) {
                  this.setState({visible: !this.state.visible});
                  this.setState({avatarUrl: avatar.get('original')});
                }
              }}
                   height='60'
                   width='60'
                   onError={(event)=>event.target.setAttribute("src", env.API_STORAGE_URL + '/tmp/default-avatar.png')}
                   alt='Not found.'
                   src={avatar ? avatar.get('sm') : env.API_STORAGE_URL + '/tmp/default-avatar.png'}/>
          </span>
        </td>
        <td width='10%'>{name}</td>
        <td width='10%'>{website}</td>
        <td width='10%'>{genres ? genres.join(', ') : ''}</td>
        <td width='10%'>{contactMobile}</td>
        <td width='10%'>{address}</td>
        <td width='10%'>{humanize(createdAt)}</td>
        <td width='4%'>
          <ConfirmButton
            expand={false}
            loading={deleteRequest.get('loading') && deleteRequest.get('id') === id}
            onClick={() => {
              destroy(id)
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

              <Table hover bordered striped responsive>
                <thead>
                <tr hidden={showFilters}>
                  <th width='5%'>{' '}</th>
                  <th width='10%'>
                    <TextField
                      placeholder='Username'
                      value={filters.get('name')}
                      name='name'
                      onChange={filterEvent}/>
                  </th>
                  <th width='10%'>
                    <TextField
                      placeholder='Website'
                      value={filters.get('website')}
                      name='website'
                      onChange={filterEvent}/>
                  </th>
                  <th width='10%'>
                    {/*<TextField*/}
                      {/*placeholder='Genres'*/}
                      {/*value={filters.get('genres')}*/}
                      {/*name='genres'*/}
                      {/*onChange={filterEvent}/>*/}
                  </th>

                  <th width='10%'>
                    <TextField
                      placeholder='Phone'
                      value={filters.get('contactMobile')}
                      name='contactMobile'
                      onChange={filterEvent}/>
                  </th>
                  <th width='10%'>
                    <TextField
                      placeholder='Address'
                      value={filters.get('address')}
                      name='address'
                      onChange={filterEvent}/>
                  </th>
                  <th width='10%'>
                    <Row>
                      <Col sm={12} style={{zIndex: 1000, display: 'flex'}}>
                        <DatePicker
                          placeholder='From'
                          value={filters.getIn(['createdAt', 'from'])}
                          name='createdAt.from'
                          onChange={filter}/>
                        <span> - </span>
                        <DatePicker
                          placeholder='To'
                          value={filters.getIn(['createdAt', 'to'])}
                          name='createdAt.to'
                          onChange={filter}/>
                      </Col>
                    </Row>
                  </th>
                  <th width='4%' className='valign-top'>
                    <Button onClick={resetFilters} color='danger'><i className='fa fa-times'/></Button>
                  </th>
                </tr>

                <tr>
                  <SortableTh width='5%' name='avatar' onSort={hardSort} sorters={sorters}>Avatar</SortableTh>
                  <SortableTh width='10%' name='name' onSort={hardSort} sorters={sorters}>Username</SortableTh>
                  <SortableTh width='10%' name='website' onSort={hardSort} sorters={sorters}>Website</SortableTh>
                  <th width='10%'>Genres</th>
                  <th width='10%'>Mobile phone</th>
                  <SortableTh width='10%' name='address' onSort={hardSort} sorters={sorters}>Address</SortableTh>
                  <SortableTh width='10%' name='createdAt' onSort={hardSort} sorters={sorters}>Created At</SortableTh>
                  <th width='4%'>Actions</th>
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