import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  Container, Row, Col, CardGroup, Card, CardBody, Button, InputGroupText
} from 'reactstrap';
import { connect } from 'react-redux';
import { withFormHandler } from '../../../support/hocs/withFormHandler';
import { login } from '../redux/actions';
import { selectLoginRequest } from '../redux/selectors';
import { LoadingButton, TextField } from '../../ui/components';
import { documentTitle } from '../../../support/hocs';

@documentTitle('Sign In')
@withFormHandler
@connect(
  (state) => (  {
    loginRequest: selectLoginRequest(state)
  }),
  {
    login
  }
)
export default class Login extends Component {
  static propTypes = {
    /**
     * Auth
     */
    // login request
    loginRequest: PropTypes.instanceOf(Immutable.Map).isRequired,
    // Login user
    login: PropTypes.func.isRequired
  };

  submitForm (event) {
    event.preventDefault();
    const { forms, login } = this.props;

    login(
      forms.get('username'),
      forms.get('password')
    );
  }

  render() {
    const { forms, inputChangeHandler, loginRequest } = this.props;
    const errors = loginRequest.get('errors');

    return (

      <div className='app flex-row align-items-center login-container'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='4'>
              <div className='logo'/>
              <CardGroup>
                <Card className='p-4'>
                  <CardBody>
                    <form onSubmit={::this.submitForm}>
                      <h1>Login</h1>
                      <p className='text-muted'>Sign In to your account</p>

                      <TextField
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={forms.get('username')}
                        error={errors.get('username') || errors.get('credentials')}
                        onChange={inputChangeHandler}
                        prependAddon={(
                          <InputGroupText>
                            <i className='fa fa-user'/>
                          </InputGroupText>
                        )}/>

                      <TextField
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={forms.get('password')}
                        error={errors.get('password')}
                        onChange={inputChangeHandler}
                        prependAddon={(
                          <InputGroupText>
                            <i className='fa fa-lock'></i>
                          </InputGroupText>
                        )}/>

                      <Row>
                        <Col xs='6'>
                          <LoadingButton
                            loading={loginRequest.get('loading')}
                            disabled={loginRequest.get('loading')}
                            color='primary'>
                            Login
                          </LoadingButton>
                        </Col>
                        <Col xs='6' className='text-right'>
                          <Button color='link' className='px-0'>Forgot password?</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
                {/*<Card className='text-white bg-primary py-5 d-md-down-none' style={{ width: 44 + '%' }}>*/}
                  {/*<CardBody className='text-center'>*/}
                    {/*<div>*/}
                      {/*<h2>Sign up</h2>*/}
                      {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut*/}
                        {/*labore et dolore magna aliqua.</p>*/}
                      {/*<Button color='primary' className='mt-3' active>Register Now!</Button>*/}
                    {/*</div>*/}
                  {/*</CardBody>*/}
                {/*</Card>*/}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}