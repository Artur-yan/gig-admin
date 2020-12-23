import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { LoadingButton } from './LoadingButton';

export class ConfirmButton extends Component {
  static propTypes = {
    alertTitle: PropTypes.string,
    alertBody: PropTypes.string,
    yesButtonText: PropTypes.string,
    noButtonText: PropTypes.string,
    color: PropTypes.oneOf(['danger', 'success', 'primary'])
  };

  static defaultProps = {
    alertTitle: 'Are You Sure?',
    alertBody: 'This action is irreversible. Do you want to continue with it?',
    yesButtonText: 'Yes',
    noButtonText: 'No',
    color: 'danger'
  };

  state = {
    modalIsOpen: false
  };

  toggleModal() {
    const { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen
    });
  }

  confirm() {
    this.toggleModal();
    this.props.onClick();
  }

  render () {
    const { modalIsOpen } = this.state;
    const {
      alertTitle, alertBody,
      yesButtonText, noButtonText,
      onClick, className, color,
      ...rest
    } = this.props;

    return (
      <div style={{ display: 'inline-block' }} className={className}>
        <LoadingButton
          {...rest}
          color={color}
          onClick={::this.toggleModal}/>

        <Modal isOpen={modalIsOpen} toggle={::this.toggleModal} className={`modal-${color}`}>
          <ModalHeader toggle={::this.toggleModal}>{alertTitle}</ModalHeader>
          <ModalBody>
            {alertBody}
          </ModalBody>
          <ModalFooter>
            <Button onClick={::this.toggleModal}>{noButtonText}</Button>
            <Button color={color} onClick={::this.confirm}>{yesButtonText}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}