import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { UserForm } from '../components/index';
import { update, resetUpdateErrors } from '../redux/actions';
import { selectUpdateRequest } from '../redux/selectors';

@connect(
  (state) => ({
    updateRequest: selectUpdateRequest(state)
  }),
  {
    update, resetUpdateErrors
  }
)
export default class EditUserModal extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Immutable.Map),
    /**
     * Modal
     */
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
  };

  static defaultProps = {
    isOpen: false
  };

  componentWillReceiveProps(nextProps) {
    this.handleOpen(nextProps);
    this.handleSuccess(nextProps);
  }

  /**
   * Events
   */
  handleOpen(nextProps) {
    const { isOpen } = this.props;
    const { isOpen: nextIsOpen } = nextProps;

    if (!isOpen && nextIsOpen) {
      this.props.resetUpdateErrors();
    }
  }

  handleSuccess(nextProps) {
    const { success } = this.props.updateRequest;
    const { success: nextSuccess } = nextProps.updateRequest;

    if (!success && nextSuccess) {
      const { toggle, onSuccess } = this.props;

      toggle();
      typeof onSuccess === 'function' && onSuccess();
    }
  }

  submit(data) {
    const { user, update } = this.props;
    update(user.get('id'), data);
  }

  render () {
    const {
      user,
      isOpen, toggle,
      updateRequest
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle} className='modal-lg'>
        <ModalHeader toggle={toggle}>Update User</ModalHeader>
        <ModalBody>
          <UserForm
            submitButtonText='Update'
            defaultForm={user}
            submit={::this.submit}
            submitRequest={updateRequest}
            editing={true}/>
        </ModalBody>
      </Modal>
    );
  }
}