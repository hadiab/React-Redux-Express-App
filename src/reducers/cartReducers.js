import { 
  ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART, GET_CART 
} from '../actions/cartActions';

const initState = { cart: [], totalAmount: 0, totalQuantity: 0 };

export default (state=initState, action) => {
  switch(action.type){
    case GET_CART: {
      return { 
        ...state, 
        cart: action.payload, 
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity,
      }
    }

    case ADD_TO_CART: {
      return { 
        ...state, 
        cart: action.payload, 
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity,
      }
    }

    case UPDATE_CART: {
      return { 
        ...state, 
        cart: action.payload, 
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity,  
      }
    }

    case DELETE_FROM_CART: {
      return { 
        ...state, 
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity,
      }
    }
  }
  return state;
}

export function totals(payload){
  const totalAmount = payload.map(cart => {
    return cart.price * cart.quantity
  }).reduce((a, b) => a + b, 0);

  const totalQuantity = payload.map(qty => {
    return qty.quantity
  }).reduce((a, b) => a + b, 0);

  return { amount: totalAmount.toFixed(2), quantity: totalQuantity }
}