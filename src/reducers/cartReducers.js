import { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART } from '../actions/cartActions';

const initState = { cart: [], totalAmount: 0, totalQuantity: 0 };

export default (state=initState, action) => {
  switch(action.type){
    case ADD_TO_CART: {
      return { 
        ...state, 
        cart: action.payload, 
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity,
      }
    }

    case UPDATE_CART: {
      const bookToUpdate = [ ...state.cart ];

      const indexToUpdate = bookToUpdate.findIndex((book) => {
        return book._id === action._id;
      });

      const newBookToUpdate = {
        ...bookToUpdate[indexToUpdate],
        quantity: bookToUpdate[indexToUpdate].quantity + action.unit
      }

      let cartUpdate = [ 
        ...bookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...bookToUpdate.slice(indexToUpdate + 1)
      ] 

      return { 
        ...state, 
        cart: cartUpdate, 
        totalAmount: totals(cartUpdate).amount,
        totalQuantity: totals(cartUpdate).quantity,  
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