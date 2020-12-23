import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

export class SessionExpirationModal extends Component {
  static propTypes = {
    /**
     * Modal
     */
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    onStay: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired
  };

  render () {
    const { isOpen, toggle, onStay, onLeave } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className='modal-lg'>
        <ModalHeader toggle={toggle}>Your session is about to expire</ModalHeader>
        <ModalBody>
          <p>Your session is about to be closed due to inactivity. You can logout or choose to remain active.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onLeave} color='red'>Leave</Button>
          <Button onClick={onStay} color='primary'>Stay</Button>
        </ModalFooter>
      </Modal>
    );
  }
}