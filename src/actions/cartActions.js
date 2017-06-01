export const ADD_TO_CART      = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const UPDATE_CART      = 'UPDATE_CART';

export function addToCart(book){
  return {
    type: ADD_TO_CART,
    payload: book
  }
}

export function updateCart(_id, unit){
  return {
    type: UPDATE_CART,
    _id: _id,
    unit: unit
  }
}

export function deleteFromCart(book){
  return {
    type: DELETE_FROM_CART,
    payload: book
  }
}
