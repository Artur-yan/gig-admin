import createSagaMiddleware from 'redux-saga';
import clientMiddleware from './middlewares/clientMiddleware';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import rootSaga from './sagas';

import { LOCATION_CHANGE } from '../modules/app/redux/actions';

export default (history, apiClient) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    applyMiddleware(
      clientMiddleware(apiClient),
      routerMiddleware(history),
      sagaMiddleware
    )
  );

  history.listen((location, action) => {
    store.dispatch({
      type: LOCATION_CHANGE,
      location,
      action
    });
  });

  sagaMiddleware.run(rootSaga);

  return store;
};