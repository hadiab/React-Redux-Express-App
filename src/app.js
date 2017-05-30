import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers';
import { createBook, updateBook, deleteBook } from './actions/booksActions';
import { addToCart } from './actions/cartActions';

// Create Store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// Dispatch action creator
store.dispatch(createBook(
  [
    {
      id: 1, 
      title: 'Harry Potter', 
      discription: 'New book was added since 1998',
      price: 33.90
    },
    {
      id: 2, 
      title: 'Node js', 
      discription: 'Node js Book 2011',
      price: 70.00
    },
  ]
))


// Delete Book
store.dispatch(deleteBook({ id: 1 }))

// Update Book
store.dispatch(updateBook(
  { 
    id: 2,
    title: 'Redux new tutorial for you man.'
  }
));

// Add to Cart
store.dispatch(addToCart([{ id: 2 }]))