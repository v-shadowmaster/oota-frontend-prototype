import {useReducer} from 'react';
import userReducer from './reducers/userSlice';
import cartReducer from './reducers/cartSlice';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
