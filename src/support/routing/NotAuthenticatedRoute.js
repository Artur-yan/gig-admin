import React, { Component } from 'react';
import { Route } from './Route';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../modules/auth/redux/actions';
import SessionStorage from '../SessionStorage';

@withRouter
@connect(
  () => ({}),
  { logout }
)
export class NotAuthenticatedRoute extends Component {

  componentWillMount() {
    if (SessionStorage.get('accessToken')) {
      this.props.logout(true);
    }
  }

  render () {
    return <Route {...this.props}/>;
  }
}
