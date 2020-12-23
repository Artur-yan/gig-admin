import React, { Component } from 'react';
import moment from '../../../configs/moment';
import SessionStorage from '../../../support/SessionStorage';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logAction, logout, refreshSession, validateSession } from '../../auth/redux/actions';
import { selectLastActionTime, selectUser, selectValidationRequest } from '../../auth/redux/selectors';
import { SessionExpirationModal } from '../components';
import { captureRouteNotFound, Route } from '../../../support/routing';
import NoMatchPage from '../../layout/containers/NoMatchPage';

@captureRouteNotFound(<Route status={404} component={NoMatchPage}/>)
@withRouter
@connect(
  (state) => ({
    validationRequest: selectValidationRequest(state),
    user: selectUser(state),
    lastActionTime: selectLastActionTime(state)
  }),
  {
    logAction, logout, refreshSession, validateSession
  }
)
export default class AppContainer extends Component {
  /**
   * Time in seconds after which user will be
   * automatically logged out if the application is idle
   * (minimum 2 minutes or it will break)
   */
  static sessionLifetime = 20 * 60;

  apiSessionClock;
  sessionClock;
  autoLogoutClock;

  state = {
    showSessionExpiresModal: false
  };

  componentWillMount() {
    const { validateSession } = this.props;

    if(SessionStorage.get('accessToken')) {
      validateSession();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleAuthenticationSuccess(nextProps);
  }

  handleAuthenticationSuccess(nextProps) {
    const { user } = this.props;
    const { user: nextUser } = nextProps;

    if (!user && nextUser) {
      this.startApiSessionClock();
      this.startSessionClock();
    }
  }

  /**
   * Start clock to auto-refresh session
   * 5 minutes before session expiration
   */
  startApiSessionClock() {
    const sessionExpiresAt = SessionStorage.get('tokenExpiresAt');
    const expiresMs = moment(sessionExpiresAt).subtract(5, 'minutes').diff(moment());

    if (this.apiSessionClock) {
      clearTimeout(this.apiSessionClock);
    }

    if (sessionExpiresAt) {
      // Refresh session, then restart clock
      this.apiSessionClock = setTimeout(() => {
        if (expiresMs > 0) {
          this.props.refreshSession();
        }

        this.apiSessionClock = null;
        this.startApiSessionClock();
      }, expiresMs);
    }
  }

  /**
   * Start the session auto-logout clock
   */
  startSessionClock() {
    const expiresMs = AppContainer.sessionLifetime * 1000;
    if (this.sessionClock) {
      clearTimeout(this.sessionClock);
    }

    if (expiresMs > 0) {
      // Set to expire in 1 hour
      this.sessionClock = setTimeout(() => {
        this.sessionClock = null;
        this.checkIfIsIdle.call(this);
      }, expiresMs);
    }
  }

  /**
   * See if the application was idle
   */
  checkIfIsIdle() {
    const { lastActionTime } = this.props;
    const now = moment();
    // Check if there was any activity in the given time
    if (now.diff(lastActionTime) > AppContainer.sessionLifetime * 1000) {
      this.setState({ showSessionExpiresModal: true });
      // One minute until auto logout
      this.autoLogoutClock = setTimeout(::this.closeSessionExpiredModalAndLogout, 60000);
    } else {
      this.startSessionClock.call(this);
    }
  }

  /**
   * Close session expired dialog and logout
   */
  closeSessionExpiredModalAndLogout() {
    this.closeSessionExpiredModal();
    this.props.logout();
  }

  /**
   * Reset inactivity timer
   */
  resetSessionClock() {
    clearTimeout(this.autoLogoutClock);
    // Set last activity to now
    this.props.logAction();
    this.closeSessionExpiredModal();
    // Restart clock
    this.startSessionClock();
  }

  /**
   * Handle toggle request from modal
   */
  handleSessionExpiredModalToggle() {
    const { showSessionExpiresModal } = this.state;
    if (showSessionExpiresModal) { //if closing
      this.resetSessionClock();
    }
    this.setState({ showSessionExpiresModal: !showSessionExpiresModal });
  }

  /**
   * Close session expired modal window
   */
  closeSessionExpiredModal() {
    this.setState({ showSessionExpiresModal: false });
  }

  render () {
    const { children } = this.props;
    const { showSessionExpiresModal } = this.state;

    return (
      <div>
        {children}
        <SessionExpirationModal
          isOpen={showSessionExpiresModal}
          toggle={::this.handleSessionExpiredModalToggle}
          onStay={::this.resetSessionClock}
          onLeave={::this.closeSessionExpiredModalAndLogout}/>
      </div>
    );
  }
}
