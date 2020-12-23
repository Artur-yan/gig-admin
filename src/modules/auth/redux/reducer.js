import Immutable from 'immutable';
import moment from '../../../configs/moment';
import {
  LOG_ACTION, SET_REDIRECT_URI,
  LOGIN, LOGIN_FAIL, LOGIN_SUCCESS,
  LOGOUT, LOGOUT_FAIL, LOGOUT_SUCCESS,
  REFRESH_SESSION, REFRESH_SESSION_FAIL, REFRESH_SESSION_SUCCESS,
  VALIDATE_SESSION, VALIDATE_SESSION_FAIL, VALIDATE_SESSION_SUCCESS,
} from './actions';
import { saveSession } from '../../../support/helpers/session';
import { getValidationErrorFromResponse } from '../../../support/helpers/validation';

const initialState = Immutable.fromJS({
  isLoggedIn: false,
  user: undefined,
  lastActionTime: undefined,
  redirectAfterLogin: '/',
  loginRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  logoutRequest: {
    loading: false,
    success: false,
    fail: false,
  },
  validateRequest: {
    loading: false,
    success: false,
    fail: false,
  },
  refreshSessionRequest: {
    loading: false,
    success: false,
    fail: false,
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     */
    case SET_REDIRECT_URI:
      return state.set('redirectAfterLogin', action.uri);
    /**
     */
    case LOG_ACTION:
      return state.set('lastActionTime', moment().format());
    /**
     * Login
     */
    case LOGIN:
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', Immutable.Map())
        );
    case LOGIN_SUCCESS:
      try {
        saveSession(action.result);
      } catch (e) {
        console.log(e);
      }
      return state
        .set('user', Immutable.fromJS(action.result.user))
        .set('loginRequest', state.get('loginRequest')
          .set('success', true)
          .set('loading', false)
        );
    case LOGIN_FAIL:
      return state
        .set('loginRequest', state.get('loginRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', getValidationErrorFromResponse(action.error.response))
        );

    /**
     * Logout
     */
    case LOGOUT:
      return state
        .set('logoutRequest', state.get('logoutRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case LOGOUT_SUCCESS:
      return state
        .remove('user')
        .set('logoutRequest', state.get('logoutRequest')
          .set('success', true)
          .remove('loading')
        );
    case LOGOUT_FAIL:
      return state
        .remove('user')
        .set('logoutRequest', state.get('logoutRequest')
          .set('fail', true)
          .remove('loading')
        );

    /**
     * Validate session
     */
    case VALIDATE_SESSION:
      return state
        .set('validateRequest', state.get('validateRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case VALIDATE_SESSION_SUCCESS:
      return state
        .set('user', Immutable.fromJS(action.result.user))
        .set('validateRequest', state.get('validateRequest')
          .set('success', true)
          .remove('loading')
        );
    case VALIDATE_SESSION_FAIL:
      return state
        .remove('user')
        .set('validateRequest', state.get('validateRequest')
          .set('fail', true)
          .remove('loading')
        );

    /**
     * Refresh session
     */
    case REFRESH_SESSION:
      return state
        .set('refreshSessionRequest', state.get('refreshSessionRequest')
          .set('loading', true)
          .remove('success')
          .remove('fail')
        );
    case REFRESH_SESSION_SUCCESS:
      try {
        saveSession(action.result);
      } catch (e) {
        console.log(e);
      }
      return state
        .set('user', Immutable.fromJS(action.result.user))
        .set('refreshSessionRequest', state.get('refreshSessionRequest')
          .set('success', true)
          .remove('loading')
        );
    case REFRESH_SESSION_FAIL:
      return state
        .remove('user')
        .set('refreshSessionRequest', state.get('refreshSessionRequest')
          .set('fail', true)
          .remove('loading')
        );

    default:
      return state;
  }
}