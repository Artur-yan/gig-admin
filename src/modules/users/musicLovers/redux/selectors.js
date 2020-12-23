import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectUserDomain = (state) => state.musicLovers;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Create Request
 */
export const selectCreateRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update Request
 */
export const selectUpdateRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * Delete Request
 */
export const selectDeleteRequest = createSelector(
  selectUserDomain,
  (subState) => subState.get('deleteRequest')
);