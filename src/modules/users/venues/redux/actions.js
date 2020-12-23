export const GET_RECORDS = '[Venues] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Venues] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Venues] GET_RECORDS_FAIL';

export const CREATE = '[Venues] CREATE';
export const CREATE_SUCCESS = '[Venues] CREATE_SUCCESS';
export const CREATE_FAIL = '[Venues] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[Venues] RESET_CREATE_ERRORS';

export const UPDATE = '[Venues] UPDATE';
export const UPDATE_SUCCESS = '[Venues] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Venues] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[Venues] RESET_UPDATE_ERRORS';

export const DELETE = '[Venues] DELETE';
export const DELETE_SUCCESS = '[Venues] DELETE_SUCCESS';
export const DELETE_FAIL = '[Venues] DELETE_FAIL';

/**
 * Get records
 */
export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`venues`, params, {include: 'createdAt, website, genres, address, contactMobile'})
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('venues', data, params)
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
    promise: (apiClient) => apiClient.put(`venues/${id}`, data, params)
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
export function destroy(id, params = {}) {
  return {
    id,
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`users/${id}`, params)
  };
}