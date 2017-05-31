import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers';
import { createBook, updateBook, deleteBook } from './actions/booksActions';
import { addToCart } from './actions/cartActions';

import BooksList from './components/pages/BooksList';

// Create Store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render (
  <Provider store={store}>
    <BooksList />
  </Provider>, 
  document.getElementById('app')
);
