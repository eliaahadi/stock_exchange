const initialState = {
  stocks: [],
  loading: false,
  error: null
};

const stocksReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STOCKS_LOADING":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "GET_STOCKS_SUCCESS": 
      return {...state, loading: false, error: null, stocks:[...action.data]}
    case "GET_STOCKS_REJECTED": 
      return {...state, loading: false, error: action.data.error, stocks:[...action.data]}
    default:
      return state;
  }
}

export default stocksReducers;