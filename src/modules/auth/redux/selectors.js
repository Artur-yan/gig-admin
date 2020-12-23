import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectAuthDomain = (state) => state.auth;

export const selectLoginRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('loginRequest')
);

export const selectValidationRequest = createSelector(
  selectAuthDomain,
  (subState) => subState.get('validateRequest')
);

export const selectUser = createSelector(
  selectAuthDomain,
  (subState) => subState.get('user')
);

export const selectLastActionTime = createSelector(
  selectAuthDomain,
  (subState) => subState.get('lastActionTime')
);

export const selectRedirectAfterLogin = createSelector(
  selectAuthDomain,
  (subState) => subState.get('redirectAfterLogin')
);