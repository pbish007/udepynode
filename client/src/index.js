import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
//temp code for testing the survey
import axios from 'axios';
window.axios = axios;
//temp code for testing

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
  // other store enhancers if any
);

const store = createStore(reducers, {}, enhancer);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.querySelector('#root'),
);

console.log('theme', theme);
console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
