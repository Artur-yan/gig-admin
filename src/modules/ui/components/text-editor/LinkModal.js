import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormHandler } from '../../../../support/hocs';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { TextField } from '../TextField';

@withFormHandler
export class LinkModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    promptForText: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen, setForms } = this.props;
    const { isOpen: nextIsOpen } = nextProps;

    if (isOpen && !nextIsOpen) {
      setForms({
        href: '', text: ''
      });
    }
  }

  confirm() {
    const { onConfirm, toggle, forms } = this.props;
    typeof onConfirm === 'function' && onConfirm(forms.get('href') || '', forms.get('text') || '');
    toggle();
  }

  render () {
    const { isOpen, toggle, forms, inputChangeHandler, promptForText } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          <TextField
            label='Enter the URL of the link:'
            placeholder='www.example.com'
            name='href'
            value={forms.get('href')}
            onChange={inputChangeHandler}/>

          {promptForText && (
            <TextField
              label='Enter the text for the link:'
              placeholder='e.g. a pretty link'
              name='text'
              value={forms.get('text')}
              onChange={inputChangeHandler}/>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button color='primary' onClick={::this.confirm}>OK</Button>
        </ModalFooter>
      </Modal>
    );
  }
}