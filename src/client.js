import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

//

// Create Store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

render (
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);
