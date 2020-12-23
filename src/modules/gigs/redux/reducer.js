import Immutable from 'immutable';
import {
  GET_RECORDS, GET_RECORDS_FAIL, GET_RECORDS_SUCCESS,
  CREATE, CREATE_FAIL, CREATE_SUCCESS, RESET_CREATE_ERRORS,
  UPDATE, UPDATE_FAIL, UPDATE_SUCCESS, RESET_UPDATE_ERRORS,
  DELETE, DELETE_FAIL, DELETE_SUCCESS,
  IS_APPROVED, IS_APPROVED_SUCCESS, IS_APPROVED_FAIL, RESET_IS_APPROVED_ERRORS

} from './actions';
import {getValidationErrorFromResponse} from '../../../support/helpers/validation';
import {getErrorMessage} from '../../../support/helpers/toasts';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: false,
    success: false,
    fail: false,
    errorResponse: null,
    records: [],
    sorters: {},
    pagination: {
      current: 1,
      onPage: 0,
      perPage: 10,
      total: 0,
      totalPages: 1
    }
  },
  createRequest: {
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  updateRequest: {
    id: null,
    loading: false,
    success: false,
    fail: false,
    errors: {}
  },
  deleteRequest: {
    id: null,
    loading: false,
    success: false,
    fail: false,
    error: null
  }
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Get records
     */
    case GET_RECORDS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('records', Immutable.List())
        );
    case GET_RECORDS_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('success', true)
          .set('loading', false)
          .set('records', Immutable.fromJS(action.result.data))
          .set('pagination', Immutable.fromJS(action.result.meta.pagination))
        );
    case GET_RECORDS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    /**
     * Create
     */
    case CREATE:
      return state
        .set('createRequest', state.get('createRequest')
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', Immutable.Map())
        );
    case CREATE_SUCCESS:
      return state
        .set('createRequest', state.get('createRequest')
          .set('success', true)
          .set('loading', false)
        );
    case CREATE_FAIL:
      return state
        .set('createRequest', state.get('createRequest')
          .set('fail', true)
          .set('loading', false)
          .set('errors', getValidationErrorFromResponse(action.error.response))
        );
    case RESET_CREATE_ERRORS:
      return state
        .set('createRequest', state.get('createRequest')
          .set('errors', Immutable.Map())
        );

    /**
     * IsApproved
     */
    case IS_APPROVED:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('id', action.id)
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', Immutable.Map())
        );
    case IS_APPROVED_SUCCESS:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .update('records', records => records.map(record => {
            if (record.get('id') === action.id) {
              return Immutable.fromJS(record.set('isApproved', true));
            }
            return record;
          }
        )));
    case IS_APPROVED_FAIL:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('id', null)
          .set('fail', true)
          .set('loading', false)
          .set('errors', getValidationErrorFromResponse(action.error.response))
        );
    case RESET_IS_APPROVED_ERRORS:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('errors', Immutable.Map())
        );

    /**
     * Update
     */
    case UPDATE:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('id', action.id)
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('errors', Immutable.Map())
        );
    case UPDATE_SUCCESS:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('id', null)
          .set('success', true)
          .set('loading', false)
        );
    case UPDATE_FAIL:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('id', null)
          .set('fail', true)
          .set('loading', false)
          .set('errors', getValidationErrorFromResponse(action.error.response))
        );
    case RESET_UPDATE_ERRORS:
      return state
        .set('updateRequest', state.get('updateRequest')
          .set('errors', Immutable.Map())
        );
    /**
     * Delete
     */
    case DELETE:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('id', action.id)
          .set('loading', true)
          .set('success', false)
          .set('fail', false)
          .set('error', null)
        );
    case DELETE_SUCCESS:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('id', null)
          .set('success', true)
          .set('loading', false)
        );
    case DELETE_FAIL:
      return state
        .set('deleteRequest', state.get('deleteRequest')
          .set('id', null)
          .set('fail', true)
          .set('loading', false)
          .set('error', action.error.response && getErrorMessage(action.error.response))
        );
    default:
      return state;
  }
}