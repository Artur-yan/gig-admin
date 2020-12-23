import SessionStorage from '../../../support/SessionStorage';
import env from '../../../configs/app';

export const SET_REDIRECT_URI = '[Auth] SET_REDIRECT_URI';
export const LOG_ACTION = '[Auth] LOG_ACTION';

export const LOGIN = '[Auth] LOGIN';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';

export const LOGOUT = '[Auth] LOGOUT';
export const LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS';
export const LOGOUT_FAIL = '[Auth] LOGOUT_FAIL';

export const VALIDATE_SESSION = '[Auth] VALIDATE_SESSION';
export const VALIDATE_SESSION_SUCCESS = '[Auth] VALIDATE_SESSION_SUCCESS';
export const VALIDATE_SESSION_FAIL = '[Auth] VALIDATE_SESSION_FAIL';

export const REFRESH_SESSION = '[Auth] REFRESH_SESSION';
export const REFRESH_SESSION_SUCCESS = '[Auth] REFRESH_SESSION_SUCCESS';
export const REFRESH_SESSION_FAIL = '[Auth] REFRESH_SESSION_FAIL';

/**
 * Set uri to redirect people after successful login
 */
export function setRedirectUri(uri) {
  return {
    type: SET_REDIRECT_URI,
    uri
  }
}

/**
 * Login
 */
export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (apiClient) => apiClient.post('sessions', {
      username,
      password,
      clientId: env.API_CLIENT.id,
      clientSecret: env.API_CLIENT.secret
    }, {include: 'user'}, {
      'Token': null
    })
  }
}

/**
 * Logout
 */
export function logout(silently = false) {
  const token = SessionStorage.get('accessToken');

    if (token) {
    return {
      silently,
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (apiClient) => apiClient.delete('sessions')
    };
  }

  return {
    silently,
    type: LOGOUT_SUCCESS
  };
}

/**
 * @returns {*}
 */
export function validateSession() {
  const token = SessionStorage.get('accessToken');

  if (token) {
    return {
      types: [VALIDATE_SESSION, VALIDATE_SESSION_SUCCESS, VALIDATE_SESSION_FAIL],
      promise: (apiClient) => apiClient.get('sessions')
    };
  }

  return {
    type: VALIDATE_SESSION_FAIL
  };
}

/**
 *
 * @returns {{types: *[], promise: function(*): (*|AxiosPromise<any>|void)}}
 */
export function refreshSession() {
  return {
    types: [REFRESH_SESSION, REFRESH_SESSION_SUCCESS, REFRESH_SESSION_FAIL],
    promise: (apiClient) => apiClient.post('sessions/refresh')
  };
}

export function logAction() {
  return { type: LOG_ACTION };
}