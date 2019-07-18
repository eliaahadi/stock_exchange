// "use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import stocksReducers from './stocksReducers';
import cartReducers from './cartReducers';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  stocks: stocksReducers,
  cart: cartReducers
})