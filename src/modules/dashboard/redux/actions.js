export const GET_RECORDS = '[Dashboard] GET_RECORDS';
export const GET_RECORDS_SUCCESS = '[Dashboard] GET_RECORDS_SUCCESS';
export const GET_RECORDS_FAIL = '[Dashboard] GET_RECORDS_FAIL';

/**
 * Get records
 */
export function getRecords(page, params = {}) {
  return {
    types: [GET_RECORDS, GET_RECORDS_SUCCESS, GET_RECORDS_FAIL],
    promise: (apiClient) => apiClient.get(`statistics`, params)
  }
}