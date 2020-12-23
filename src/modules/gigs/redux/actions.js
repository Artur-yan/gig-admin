export const GET_RECORDS = '[Gigs] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Gigs] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Gigs] GET_RECORDS_FAIL';

export const CREATE = '[Gigs] CREATE';
export const CREATE_SUCCESS = '[Gigs] CREATE_SUCCESS';
export const CREATE_FAIL = '[Gigs] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[Gigs] RESET_CREATE_ERRORS';

export const UPDATE = '[Gigs] UPDATE';
export const UPDATE_SUCCESS = '[Gigs] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Gigs] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[Gigs] RESET_UPDATE_ERRORS';

export const DELETE = '[Gigs] DELETE';
export const DELETE_SUCCESS = '[Gigs] DELETE_SUCCESS';
export const DELETE_FAIL = '[Gigs] DELETE_FAIL';

export const IS_APPROVED = '[Gigs] IS_APPROVED';
export const IS_APPROVED_SUCCESS = '[Gigs] IS_APPROVED_SUCCESS';
export const IS_APPROVED_FAIL = '[Gigs] IS_APPROVED_FAIL';
export const RESET_IS_APPROVED_ERRORS = '[Gigs] RESET_IS_APPROVED_ERRORS';
/**
 * Get records
 */
export function getRecords(params = {}) {

  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`gigs`, params,
      {include:
          'createdAt,' +
          'artists,' +
          'description,' +
          'startsAt,' +
          'endsAt,' +
          'price,' +
          'artists,' +
          'venue,' +
          'types,' +
          'owner,' +
          'isApproved'})
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('gigs', data, params)
  }
}
export function resetCreateErrors() {
  return {
    type: RESET_CREATE_ERRORS
  };
}

/**
 * Update record
 */
export function update(id, data, params = {}) {
  return {
    id,
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.put(`gigs/${id}`, data, params)
  };
}

/**
 * Update record
 */
export function isApproved(id) {
  return {
    id,
    types: [IS_APPROVED, IS_APPROVED_SUCCESS, IS_APPROVED_FAIL],
    promise: (apiClient) => apiClient.put(`gigs/${id}/approve`)
  };
}
export function resetUpdateErrors() {
  return {
    type: RESET_UPDATE_ERRORS
  };
}

/**
 * Delete record
 */
export function destroy(userId, id, params = {}) {
  return {
    id,
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`users/${userId}/gigs/${id}`, params)
  };
}