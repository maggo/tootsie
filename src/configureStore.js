import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers.js';
import { loadState, saveState } from './localStorage.js';

export default function configureStore() {
  const persistedState = loadState();

  console.log(persistedState);

  const store = createStore(
    rootReducer,
    persistedState, 
    applyMiddleware(
      thunkMiddleware,
    )
  );

  store.subscribe(() => saveState({
    timeline: store.getState().timeline
  }));

  return store;
} ;
