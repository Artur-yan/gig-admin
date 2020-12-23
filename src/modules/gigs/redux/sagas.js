import { yieldErrorToasts } from '../../../support/helpers/toasts';
import {
  CREATE_FAIL, DELETE_FAIL, UPDATE_FAIL,
} from './actions';
import { all } from 'redux-saga/effects';

const gigsSagas = all([
  yieldErrorToasts([
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL
  ]),
]);

export default gigsSagas;