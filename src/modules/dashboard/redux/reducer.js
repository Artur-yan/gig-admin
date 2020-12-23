import Immutable from 'immutable';
import {
  GET_RECORDS,GET_RECORDS_SUCCESS, GET_RECORDS_FAIL
} from './actions';

const initialState = Immutable.fromJS({
  getRecordsRequest: {
    loading: true,
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
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
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
          .set('records', Immutable.fromJS(action.result))
        );
    case GET_RECORDS_FAIL:
      return state
        .set('getRecordsRequest', state.get('getRecordsRequest')
          .set('loading', false)
          .set('fail', true)
        );
    default:
      return state;
  }
}