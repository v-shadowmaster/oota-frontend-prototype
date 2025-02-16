import {useReducer} from 'react';
import userReducer from './reducers/userSlice';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
