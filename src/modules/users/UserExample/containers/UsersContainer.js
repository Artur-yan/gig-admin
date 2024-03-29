import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withDataTable, documentTitle } from '../../../../support/hocs/index';
import { destroy, getRecords } from '../redux/actions';
import { selectDeleteRequest, selectGetRecordsRequest } from '../redux/selectors';
import { ConfirmButton, DatePicker, Pagination, PerPageSelector, SortableTh, TextField } from '../../../ui/components/index';
import { Button, Card, CardBody, Col, Row, Table } from 'reactstrap';
import { humanize } from '../../../../support/helpers/moment';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

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
export default class UsersContainer extends Component {
  state = {
    createModalIsOpen: false,
    editModalIsOpen: false,
    userToEdit: null
  };

  componentDidMount() {
    const { getRecords } = this.props;
    getRecords();
  }

  componentWillReceiveProps(nextProps) {
    this.handleDeleteSuccess(nextProps);
  }

  toggleCreateModal() {
    const { createModalIsOpen } = this.state;
    this.setState({
      createModalIsOpen: !createModalIsOpen
    });
  }

  toggleEditModal() {
    const { editModalIsOpen, userToEdit } = this.state;
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
    const { destroy, deleteRequest } = this.props;
    const { id, username, email, createdAt } = record;

    return (
      <tr key={key}>
        <td width='10%'>{id}</td>
        <td width='25%'>{username}</td>
        <td width='25%'>{email}</td>
        <td width='30%'>{ humanize(createdAt) }</td>
        <td width='10%'>
          <ConfirmButton
            expand={false}
            loading={deleteRequest.get('loading') && deleteRequest.get('id') === id}
            onClick={() => { destroy(id) }}
            type='button'
            color='danger'>
            <i className='fa fa-trash'/>
          </ConfirmButton>

          <Button
            type='button'
            onClick={this.editUser.bind(this, record)}
            color='primary'>
            <i className='fa fa-pencil'/>
          </Button>
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
    const { success } = this.props.deleteRequest;
    const { success: nextSuccess } = nextProps.deleteRequest;

    if (!success && nextSuccess) {
      this.props.getRecords();
    }
  }

  render () {
    const { createModalIsOpen, editModalIsOpen, userToEdit } = this.state;
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
                  <Button outline color='primary' onClick={::this.toggleCreateModal}>Add new User</Button>
                  <Button outline color='primary' onClick={toggleFilters} className='pull-right'><i className='fa fa-filter'/></Button>
                </div>
              </div>

              <Table hover bordered striped responsive>
                <thead>
                  <tr hidden={!showFilters}>
                    <th width='10%'>{' '}</th>
                    <th width='25%'>
                      <TextField
                        placeholder='Username'
                        value={filters.get('username')}
                        name='username'
                        onChange={filterEvent}/>
                    </th>
                    <th width='25%'>
                      <TextField
                        placeholder='Email'
                        value={filters.get('email')}
                        name='email'
                        onChange={filterEvent}/>
                    </th>
                    <th width='30%'>
                      <Row>
                        <Col sm={12} style={{ display: 'flex' }}>
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
                    <th width='10%' className='valign-top'>
                      <Button onClick={resetFilters} color='danger'><i className='fa fa-times'/></Button>
                    </th>
                  </tr>

                  <tr>
                    <SortableTh width='10%' name='id' onSort={hardSort} sorters={sorters}>ID</SortableTh>
                    <SortableTh width='25%' name='username' onSort={hardSort} sorters={sorters}>Username</SortableTh>
                    <SortableTh width='25%' name='email' onSort={hardSort} sorters={sorters}>Email</SortableTh>
                    <SortableTh width='30%' name='createdAt' onSort={hardSort} sorters={sorters}>Created At</SortableTh>
                    <th width='10%'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                { renderRecords(::this.recordRenderer) }
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