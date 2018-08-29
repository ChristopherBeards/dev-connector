import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// * Import the rootReducer
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// * Create store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
