export const GET_RECORDS = '[Artists] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Artists] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Artists] GET_RECORDS_FAIL';

export const CREATE = '[Artists] CREATE';
export const CREATE_SUCCESS = '[Artists] CREATE_SUCCESS';
export const CREATE_FAIL = '[Artists] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[Artists] RESET_CREATE_ERRORS';

export const UPDATE = '[Artists] UPDATE';
export const UPDATE_SUCCESS = '[Artists] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[Artists] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[Artists] RESET_UPDATE_ERRORS';

export const DELETE = '[Artists] DELETE';
export const DELETE_SUCCESS = '[Artists] DELETE_SUCCESS';
export const DELETE_FAIL = '[Artists] DELETE_FAIL';

/**
 * Get records
 */
export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`artists`, params, {include: 'createdAt, website, genres, address, contactMobile, owner'})
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('artists', data, params)
  }
}

/**
 * @returns {{type: string}}
 */
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
    promise: (apiClient) => apiClient.put(`artists/${id}`, data, params)
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