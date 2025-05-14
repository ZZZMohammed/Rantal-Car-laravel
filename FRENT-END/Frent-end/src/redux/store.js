import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { carReducer } from './reducers/BookReducer';


const store = createStore(carReducer, applyMiddleware(thunk));

export default store;