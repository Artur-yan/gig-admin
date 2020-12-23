import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { UserForm } from '../components/index';
import { create, resetCreateErrors } from '../redux/actions';
import { selectCreateRequest } from '../redux/selectors';

@connect(
  (state) => ({
    createRequest: selectCreateRequest(state)
  }),
  {
    create, resetCreateErrors
  }
)
export default class CreateUserModal extends Component {
  static propTypes = {
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
      this.props.resetCreateErrors();
    }
  }

  handleSuccess(nextProps) {
    const { success } = this.props.createRequest;
    const { success: nextSuccess } = nextProps.createRequest;

    if (!success && nextSuccess) {
      const { toggle, onSuccess } = this.props;

      toggle();
      typeof onSuccess === 'function' && onSuccess();
    }
  }

  render () {
    const {
      isOpen, toggle,
      create, createRequest
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} toggle={toggle} className='modal-lg'>
        <ModalHeader toggle={toggle}>Create a new User</ModalHeader>
        <ModalBody>
          <UserForm
            submitButtonText='Create'
            submit={create}
            submitRequest={createRequest}/>
        </ModalBody>
      </Modal>
    );
  }
}