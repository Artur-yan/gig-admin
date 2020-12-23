import { createSelector } from 'reselect';

/**
 * Select domain
 */
export const selectGigsDomain = (state) => state.gigs;

/**
 * Get Records Request
 */
export const selectGetRecordsRequest = createSelector(
  selectGigsDomain,
  (subState) => subState.get('getRecordsRequest')
);
/**
 * Create Request
 */
export const selectCreateRequest = createSelector(
  selectGigsDomain,
  (subState) => subState.get('createRequest')
);
/**
 * Update Request
 */
export const selectUpdateRequest = createSelector(
  selectGigsDomain,
  (subState) => subState.get('updateRequest')
);
/**
 * IsApproved Request
 */
export const selectIsApprovedRequest = createSelector(
  selectGigsDomain,
  (subState) => subState.get('isApprovedRequest')
);
/**
 * Delete Request
 */
export const selectDeleteRequest = createSelector(
  selectGigsDomain,
  (subState) => subState.get('deleteRequest')
);