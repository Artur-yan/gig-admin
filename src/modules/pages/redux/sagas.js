import { yieldErrorToasts } from '../../../support/helpers/toasts';
import {
  CREATE_FAIL,
  DELETE_FAIL,
  UPDATE_FAIL,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} from './actions';
import { all, put, takeLatest } from 'redux-saga/effects';
import toastr from "../../../configs/toastr";

function* afterCreateRequestSuccess(action) {
  toastr.success('Content successfully created.');
}

function* afterDeleteRequestSuccess(action) {
  toastr.success('Content successfully deleted.');
}

function* afterUpdateRequestSuccess(action) {
  toastr.success('Content successfully updated');
}
const pagesSagas = all([

  takeLatest(UPDATE_SUCCESS, afterUpdateRequestSuccess),
  takeLatest(CREATE_SUCCESS, afterCreateRequestSuccess),
  takeLatest(DELETE_SUCCESS, afterDeleteRequestSuccess),

  yieldErrorToasts([
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL,
  ]),
]);

export default pagesSagas;