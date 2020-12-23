import { all, select, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  LOGIN_FAIL, LOGIN_SUCCESS,
  LOGOUT_FAIL, LOGOUT_SUCCESS,
  REFRESH_SESSION_FAIL,
  VALIDATE_SESSION_FAIL,
} from './actions';
import { selectRedirectAfterLogin } from './selectors';
import { yieldErrorToasts } from '../../../support/helpers/toasts';
import { destroySession } from '../../../support/helpers/session';

/**
 * Redirect to the appropriate page after login success
 */
function* afterLoginSuccess () {
  let redirectTo = yield select(selectRedirectAfterLogin);
  redirectTo = redirectTo ? redirectTo : '/';

  yield put(push(redirectTo));
}

/**
 * Destroy session and redirect to login page
 */
function* destroySessionAndRedirect(action) {
  destroySession();

  //in some cases we will need to sneakily destroy session
  if (!action.silently) {
    yield put(push('/login'));
  }
}

const authSagas = all([
  takeLatest(LOGIN_SUCCESS, afterLoginSuccess),

  takeLatest([
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    VALIDATE_SESSION_FAIL,
    REFRESH_SESSION_FAIL
  ], destroySessionAndRedirect),

  yieldErrorToasts([
    LOGIN_FAIL,
  ])
]);

export default authSagas;