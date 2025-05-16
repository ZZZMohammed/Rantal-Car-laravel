import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { carReducer } from './reducers/BookReducer';

// Combine reducers for future scalability
const rootReducer = combineReducers({
  cars: carReducer,
  
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;