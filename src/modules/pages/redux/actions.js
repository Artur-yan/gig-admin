export const GET_RECORDS = '[Pages] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Users] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Users] GET_RECORDS_FAIL';

export const CREATE = '[Pages] CREATE';
export const CREATE_SUCCESS = '[Pages] CREATE_SUCCESS';
export const CREATE_FAIL = '[Pages] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[Pages] RESET_CREATE_ERRORS';

export const UPDATE = '[Pages] UPDATE';
export const UPDATE_SUCCESS = '[Pages] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Pages] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[Pages] RESET_UPDATE_ERRORS';

export const DELETE = '[Pages] DELETE';
export const DELETE_SUCCESS = '[Pages] DELETE_SUCCESS';
export const DELETE_FAIL = '[Pages] DELETE_FAIL';

/**
 * Get records
 */
export function getRecords(page, params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`customizable-texts/${page}`, params)
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('customizable-texts', data, params)
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
export function update(page, block, data, params = {}) {
  return {
    block,
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (apiClient) => apiClient.post(`customizable-texts/${page}/${block}`, data, params)
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
export function destroy(page, block, params = {}) {
  return {
    block,
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (apiClient) => apiClient.delete(`customizable-texts/${page}/${block}`, params)
  };
}