import {combineReducers} from 'redux';
import globalReducer from './../global/GlobalReducer';
import authReducer from './../auth/AuthReducer';

const combinedReducers = combineReducers({
  global: globalReducer,
  auth: authReducer,
  });

//const rootReducer = reduceReducers(combinedReducers);

export default combinedReducers;
