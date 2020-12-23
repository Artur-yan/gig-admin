import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { withFormHandler } from '../../../../support/hocs/withFormHandler';
import { Col, Row } from 'reactstrap';
import { LoadingButton, TextField } from '../../../ui/components/index';

@withFormHandler
export class UserForm extends Component {

  static propTypes = {
    /**
     * Form
     */
    defaultForm: PropTypes.instanceOf(Immutable.Map),
    /**
     * Submit
     */
    submit: PropTypes.func.isRequired,
    submitRequest: PropTypes.instanceOf(Immutable.Map).isRequired,
    /**
     * View
     */
    submitButtonText: PropTypes.string,
    editing: PropTypes.bool
  };

  static defaultProps = {
    submitButtonText: 'Submit',
    defaultForm: Immutable.fromJS({
      username: '',
    })
  };

  componentDidMount() {
    const { setForms, defaultForm } = this.props;
    setForms(defaultForm);
  }

  submitForm(event) {
    event.preventDefault();
    const { forms, submit } = this.props;
    submit(forms.toJS());
  }

  render () {
    const {
      editing,
      forms, inputChangeHandler,
      submitRequest, submitButtonText
    } = this.props;
    const { loading, errors } = submitRequest;

    return (
      <form onSubmit={::this.submitForm}>
        <Row>
          <Col sm='6'>
            <TextField
              type='text'
              label='Username'
              placeholder='username'
              name='username'
              value={forms.get('name')}
              error={errors.get('name')}
              onChange={inputChangeHandler}/>
          </Col>

          <Col sm='6'>
            <TextField
              type='text'
              label='Email'
              placeholder='email'
              name='email'
              value={forms.get('email')}
              error={errors.get('email')}
              onChange={inputChangeHandler}/>
          </Col>
        </Row>

        <Row>
          <Col sm='6'>
            <TextField
              type='password'
              label='Password'
              placeholder={editing ? '(leave blank if you don\'t want it changed)' : '*****'}
              name='password'
              value={forms.get('password')}
              error={errors.get('password')}
              onChange={inputChangeHandler}/>
          </Col>

          <Col sm='6'>
            <TextField
              type='password'
              label='Confirm Password'
              placeholder={editing ? '(leave blank if you don\'t want it changed)' : '*****'}
              name='confirmPassword'
              value={forms.get('confirmPassword')}
              error={errors.get('confirmPassword')}
              onChange={inputChangeHandler}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col sm='12'>
            <LoadingButton
              className='pull-right'
              loading={loading}
              disabled={loading}
              color='primary'>
              {submitButtonText}
            </LoadingButton>
          </Col>
        </Row>
      </form>
    );
  }
}