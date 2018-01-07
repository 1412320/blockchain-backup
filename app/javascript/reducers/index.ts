import { combineReducers } from 'redux';

import { registration } from './registration_reducer';
import { authentication } from './authenticate_reducer';
import { alert } from './alert_reducers';
import { get_info } from './get_wallet_info_reducers';
import { transfer_kcoin } from './transfer_kcoin_reducers';
import { get_newest, get_my, get_pending } from './transaction_reducers';

const RootReducer = combineReducers ({
  registration,
  authentication,
  alert,
  get_info,
  transfer_kcoin,
  get_my,
  get_newest,
  get_pending
});

export default RootReducer;
