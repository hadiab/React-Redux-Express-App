import { ADD_TO_CART, DELETE_FROM_CART } from '../actions/cartActions';

const initState = { cart: [] };

export default (state=initState, action) => {
  switch(action.type){
    case ADD_TO_CART: {
      return { ...state, cart: action.payload }
    }

    case DELETE_FROM_CART: {
      return { ...state, cart: action.payload }
    }
  }
  return state;
}