import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducers from '../reducers/index';

const middleware = applyMiddleware(thunk, logger);

const store = createStore(combineReducers, middleware);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

