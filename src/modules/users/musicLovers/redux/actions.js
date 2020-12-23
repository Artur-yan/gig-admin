export const GET_RECORDS = '[MusicLovers] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[MusicLovers] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[MusicLovers] GET_RECORDS_FAIL';

export const CREATE = '[MusicLovers] CREATE';
export const CREATE_SUCCESS = '[MusicLovers] CREATE_SUCCESS';
export const CREATE_FAIL = '[MusicLovers] CREATE_FAIL';
export const RESET_CREATE_ERRORS = '[MusicLovers] RESET_CREATE_ERRORS';

export const UPDATE = '[MusicLovers] UPDATE';
export const UPDATE_SUCCESS = '[MusicLovers] UPDATE_SUCCESS';
export const UPDATE_FAIL = '[MusicLovers] UPDATE_FAIL';
export const RESET_UPDATE_ERRORS = '[MusicLovers] RESET_UPDATE_ERRORS';

export const DELETE = '[MusicLovers] DELETE';
export const DELETE_SUCCESS = '[MusicLovers] DELETE_SUCCESS';
export const DELETE_FAIL = '[MusicLovers] DELETE_FAIL';

/**
 * Get records
 */
export function getRecords(params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`music-lovers`, params,{include: 'createdAt, about'})
  }
}

/**
 * Create record
 */
export function create(data, params = {}) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (apiClient) => apiClient.post('music-lovers', data, params)
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
    promise: (apiClient) => apiClient.put(`music-lovers/${id}`, data, params)
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