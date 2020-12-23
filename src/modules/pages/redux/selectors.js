import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectPagesDomain = (state) => state.pages;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectPagesDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Create Request
 */
export const selectCreateRequest = createSelector(
  selectPagesDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update Request
 */
export const selectUpdateRequest = createSelector(
  selectPagesDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Delete Request
 */
export const selectDeleteRequest = createSelector(
  selectPagesDomain,
  (subState) => subState.get('deleteRequest')
);