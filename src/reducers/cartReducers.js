const cartReducers = (state = [], action) => {
  switch (action.type) {
    // case "GET_CART": 
    //   return {...state,  loading: false, stocks:[...action.data]}
    case 'ADD_TO_CART':
      return state.concat([action.data])
    case 'DELETE_CART_STOCK':
      return state.filter((cart) => cart.id !== action.id)
    case 'EDIT_CART':
      return state.map((cart) => cart.id === action.id ? { ...cart, editing: !cart.editing } : cart)
    case 'UPDATE_CART':
      return state.map((cart) => {
        if (cart.id === action.id) {
          return {
            ...cart,
            title: action.data.newTitle,
            message: action.data.newMessage,
            editing: !cart.editing
          }
        } else return cart;
      })
    default:
      return state;
  }
}

export default cartReducers;