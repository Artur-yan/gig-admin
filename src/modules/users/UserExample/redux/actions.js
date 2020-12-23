export const GET_RECORDS = '[Users] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Users] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Users] GET_RECORDS_FAIL';

export const CREATE = '[Users] CREATE';
export const CREATE_SUCCESS = '[Users] CREATE_SUCCESS';
export const CREATE_FAIL = '[Users] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[Users] RESET_CREATE_ERRORS';

export const UPDATE = '[Users] UPDATE';
export const UPDATE_SUCCESS = '[Users] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Users] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[Users] RESET_UPDATE_ERRORS';

export const DELETE = '[Users] DELETE';
export const DELETE_SUCCESS = '[Users] DELETE_SUCCESS';
export const DELETE_FAIL = '[Users] DELETE_FAIL';

/**
 * Get records
 */
export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`administrators`, params)
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('administrators', data, params)
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
    promise: (apiClient) => apiClient.put(`administrators/${id}`, data, params)
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
    promise: (apiClient) => apiClient.delete(`administrators/${id}`, params)
  };
}