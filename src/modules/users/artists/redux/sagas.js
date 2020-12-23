import { yieldErrorToasts } from '../../../../support/helpers/toasts';
import {
  CREATE_FAIL, DELETE_FAIL, UPDATE_FAIL,
} from './actions';
import { all } from 'redux-saga/effects';

const artistsSagas = all([
  yieldErrorToasts([
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL
  ]),
]);

export default artistsSagas;