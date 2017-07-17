import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage.js';
import throttle from 'lodash.throttle';

export default function configureStore() {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState, 
    applyMiddleware(
      thunkMiddleware,
    )
  );

  store.subscribe(throttle(() => saveState({
    timeline: store.getState().timeline,
    authentication: {
      instances: store.getState().authentication.instances,
    }
  }), 1000));

  return store;
} ;
