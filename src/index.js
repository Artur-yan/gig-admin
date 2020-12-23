import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import Routes from './configs/routes';
import configureStore from './redux/store';
import ApiClient from './support/ApiClient';
import './support/helpers/string';
import './support/helpers/number';

import registerServiceWorker from './registerServiceWorker';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Main styles for this application
import './theme/style.scss'
// Temp fix for reactstrap
import './theme/core/_dropdown-menu-right.scss'
import 'react-viewer/dist/index.css';

// import '../styles/app.scss';

const history = createHistory();
const apiClient = new ApiClient();
const store = configureStore(history, apiClient);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
