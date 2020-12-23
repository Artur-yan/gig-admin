import Immutable from 'immutable';

function getErrorMessages(errorsImmutable) {

  return errorsImmutable.map(error => {
    if (error.get('extra').size > 0) {
      return getErrorMessages(error.get('extra'))
    }

    return error.get('message');
  });
}

export function getValidationErrorFromResponse(response) {

  if (!response || response.status !== 422) {
    return Immutable.Map();
  }

  const errors = Immutable.fromJS(response.data.errors);

  return getErrorMessages(errors);
}
