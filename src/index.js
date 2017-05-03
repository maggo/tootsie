import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import rootReducer from './reducers.js';
import './index.css';

const store = createStore(
  rootReducer,
  undefined, 
  applyMiddleware(
    thunkMiddleware,
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
