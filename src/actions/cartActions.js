export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export function addToCart(book){
  return {
    type: ADD_TO_CART,
    payload: book
  }
}

export function deleteFromCart(book){
  return {
    type: DELETE_FROM_CART,
    payload: book
  }
}