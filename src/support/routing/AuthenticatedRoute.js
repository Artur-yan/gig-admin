import React, { Component } from 'react';
import SessionStorage from '../SessionStorage';
import { Route } from './Route';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setRedirectUri } from '../../modules/auth/redux/actions';
import { selectUser } from '../../modules/auth/redux/selectors';

@withRouter
@connect(
  (state) => ({
    user: selectUser(state)
  }),
  { setRedirectUri }
)
export class AuthenticatedRoute extends Component {

  static redirectTo = 'login';

  componentWillMount() {
    const { setRedirectUri, location } = this.props;

    //save current location if we are going to deny user the acess
    //so he can be redirected there after login
    if (!SessionStorage.get('accessToken')) {
      setRedirectUri(location.pathname);
    }
  }

  /**
   * Render router content
   * @param props
   * @returns {*}
   */
  renderContent(props) {
    const { user, render, component: Component } = this.props;
    const isLoggedIn = SessionStorage.get('accessToken');

    //if no token in session storage redirect immediately
    if (!isLoggedIn) {
      return <Redirect push={true} to={AuthenticatedRoute.redirectTo}/>;
    }

    //if there is a token but the user has not registered yet return a blank
    if (!user) {
      return null;
    }

    //if there is a render function use it
    if (typeof render === 'function') {
      return render(props);
    }

    //render the component otherwise
    return <Component {...props}/>;
  }

  render () {
    const { component, render, user, ...rest } = this.props;
    return <Route {...rest} render={::this.renderContent}/>;
  }
}
