import { createSelector } from 'reselect';

/**
 * Select dashboard
 */
export const selectDashboardDomain = (state) => state.dashboard;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectDashboardDomain,
  (subState) => subState.get('getRecordsRequest')
);