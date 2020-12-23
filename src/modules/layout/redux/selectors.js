import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectLayoutDomain = (state) => state.layout;

/**
 * Routes
 */
export const selectRoutes = createSelector(
  selectLayoutDomain,
  (subState) => subState.get('routes')
);