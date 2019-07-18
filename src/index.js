import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducers from './reducers/index';
// import cartReducers from './reducers/cartReducers';

// const initialState = window.INITIAL_STATE;
const middleware = applyMiddleware(thunk, logger);

const store = createStore(combineReducers, middleware);


// const store = createStore(postReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);