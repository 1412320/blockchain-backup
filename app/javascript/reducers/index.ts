import { combineReducers } from 'redux';

import { registration } from './registration_reducer';
import { authentication } from './authenticate_reducer';
import { alert } from './alert_reducers';

const RootReducer = combineReducers ({
  registration,
  authentication,
  alert
});

export default RootReducer;
