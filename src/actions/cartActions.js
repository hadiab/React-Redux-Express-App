import axios from 'axios';

export const GET_CART          = 'GET_CART';
export const GET_CART_ERROR    = 'GET_CART_ERROR';
export const ADD_TO_CART       = 'ADD_TO_CART';
export const ADD_TO_CART_ERROR = 'ADD_TO_CART_ERROR';
export const UPDATE_CART       = 'UPDATE_CART';
export const UPDATE_CART_ERROR = 'UPDATE_CART_ERROR';
export const DELETE_FROM_CART  = 'DELETE_FROM_CART';
export const DELETE_FROM_CART_ERROR  = 'DELETE_FROM_CART';

export function getCart(){
  return (dispatch) => {
    axios.get('/api/cart')
    .then((res) => {
      dispatch({ type: GET_CART, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: GET_CART_ERROR, payload: "Error!!" })
    })
  }
}

export function addToCart(cart){
  return (dispatch) => {
    axios.post('/api/cart', cart)
    .then((res) => {
      dispatch({ type: ADD_TO_CART, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: ADD_TO_CART_ERROR, payload: "Error!!" })
    })
  }
}

export function updateCart(_id, unit, cart){
  const bookToUpdate = cart;

  const indexToUpdate = bookToUpdate.findIndex((book) => {
    return book._id === _id;
  });

  const newBookToUpdate = {
    ...bookToUpdate[indexToUpdate],
    quantity: bookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [ 
    ...bookToUpdate.slice(0, indexToUpdate),
    newBookToUpdate,
    ...bookToUpdate.slice(indexToUpdate + 1)
  ] 

  return (dispatch) => {
    axios.post('/api/cart', cartUpdate)
    .then((res) => {
      dispatch({ type: UPDATE_CART, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: UPDATE_CART_ERROR, payload: "Error!!" })
    })
  }
}

export function deleteFromCart(_id, cart){
  const cartToDelete = cart;

  const indexToDelete = cartToDelete.findIndex((book) => {
    return book._id === _id;
  });

  let cartAfterDelete = [ 
    ...cartToDelete.slice(0, indexToDelete),
    ...cartToDelete.slice(indexToDelete + 1)
  ];
  
  return (dispatch) => {
    axios.post('/api/cart', cartAfterDelete)
    .then((res) => {
      dispatch({ type: DELETE_FROM_CART, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: DELETE_FROM_CART_ERROR, payload: "Error!!" })
    })
  }
}
