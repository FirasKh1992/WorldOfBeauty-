import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initiateState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initiateState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
