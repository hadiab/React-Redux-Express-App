import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducers';
import App from './components/App';

// Create Store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('app')
);
