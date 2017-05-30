const initState = { cart: [] };

export default (state=initState, action) => {
  switch(action.type){
    case 'ADD_TO_CART': {
      return { cart: [...state.cart, ...action.payload] }
    }
  }
  return state;
}