import { combineReducers } from 'redux';

import { registration } from './registration_reducer';
import { authentication } from './authenticate_reducer';
import { alert } from './alert_reducers';
import { get_info } from './get_wallet_info_reducers';

const RootReducer = combineReducers ({
  registration,
  authentication,
  alert,
  get_info
});

export default RootReducer;
