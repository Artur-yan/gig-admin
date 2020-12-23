import { takeLatest } from 'redux-saga/effects';
import toastr from '../../configs/toastr';

export function getErrorMessage(response) {
  if(response.data && typeof response.data.message === 'string') {
    return response.data.message;
  }

  return 'Something went wrong :\'(';
}

export function yieldErrorToasts(types) {
  return takeLatest([...types], function (action) {
    if(typeof action.error !== 'undefined') {
      toastr.error(
        getErrorMessage(action.error.response),
      );
    }
  });
}

export function getSuccessMessage (response) {
  if(response && typeof response.message === 'string') {
    return response.message;
  }

  return 'Successfully Created!';
}

export function yieldSuccessToasts (types) {
  return takeLatest([...types], function (action) {
    if(typeof action.success !== 'undefined') {
      toastr.success(
        getSuccessMessage(action.success.response),
      );
    }
  });
}