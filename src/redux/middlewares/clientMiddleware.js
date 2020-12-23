import Immutable from 'immutable';
import moment from '../../configs/moment';

let pending = Immutable.Map();
let cancellationHandlers = Immutable.Map();

/**
 * @param key
 * @param promise
 * @param cancelHandler
 */
function addToQueue(key, promise, cancelHandler) {
  pending = pending.set(key, promise);
  cancellationHandlers = cancellationHandlers.set(key, cancelHandler);
}

/**
 * @param key
 */
function removeFromQueue(key) {
  pending = pending.remove(key);
  cancellationHandlers = cancellationHandlers.remove(key);
}

/**
 * @param key
 * @returns {boolean}
 */
function isPending(key) {
  return pending.has(key);
}

export default function clientMiddleware(apiClient) {
  return ({getState, dispatch}) => {
    return next => action => {

      const nextState = getState();
      // Keep reference to last time an action was performed
      nextState.auth = nextState.auth.set('lastActionTime', moment().format());

      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, upload, concurrent = true, ...rest } = action;

      if (!Array.isArray(types) && promise) {
        return Promise.resolve(promise().then(() => {
          next(action);
        }));
      }

      if (!promise) {
        return next(action);
      }

      // get the request data
      const [REQUEST, SUCCESS, FAILURE] = types;

      //reset possibly set global configurations
      apiClient.resetConfigs();

      // if the actions is marked as an upload
      // add a callback to track progress
      if (promise && upload) {
        const PROGRESS = types[3];
        apiClient.uploadProgress(progressEvent => {
          next({...rest, type: PROGRESS, progressEvent});
        });
      }

      //add a cancellation handler to client
      const cancelHandler = apiClient.getCancel();

      //if there is pending request of the same type and concurrency is not allowed
      //cancel pending request before proceeding with new one
      if (isPending(REQUEST) && !concurrent) {
        const prevCancelHandler = cancellationHandlers.get(REQUEST);
        removeFromQueue(REQUEST);
        typeof prevCancelHandler === 'function' && prevCancelHandler();
      }

      // if there is a pending request of the same type
      // use that instead for a queue
      let resolvePromise = null;
      if (pending.has(REQUEST)) {
        resolvePromise = pending.get(REQUEST)
          .then(() => {

            //fire the request itself
            next({...rest, type: REQUEST});

            return Promise.resolve(
              promise(apiClient, getState)
                .then(result => {
                  // clear this promise from the queue
                  removeFromQueue(REQUEST);

                  // send back a success result
                  return next({...rest, result, type: SUCCESS});
                })
                .catch(error => {
                  if (!apiClient.isCancel(error)) {
                    // clear this promise from the queue
                    removeFromQueue(REQUEST);

                    // send back an error result
                    return next({...rest, error, type: FAILURE});
                  }
                })
            );
          });
      } else {
        // fire off the request to show we are making this request
        next({...rest, type: REQUEST});

        resolvePromise = promise(apiClient, getState)
          .then(result => {
            removeFromQueue(REQUEST);

            // send back a success result
            return next({...rest, result, type: SUCCESS});
          })
          .catch(error => {
            if (!apiClient.isCancel(error)) {
              // clear this promise from the queue
              removeFromQueue(REQUEST);

              // send back an error result
              return next({...rest, error, type: FAILURE});
            }
          });
      }

      // set this as request type as pending
      addToQueue(REQUEST, resolvePromise, cancelHandler);

      return resolvePromise;
    };
  };
}