import { WalletContants } from '../contants';
import { UserContants } from '../contants';

const initState = { 
  wallet_address: "",
  real_amount: 0,
  role: 0,
  available_amount: 0,
  used_tfa: false,
  tfa_code: ""
};


export function get_info(state = {}, action) {
  switch(action.type) {
    case WalletContants.INFO_REQUEST:
      return {
        wallet_address: action.wallet_address,
        real_amount: action.real_amount,
        role: action.role,
        available_amount: action.available_amount
      }
    case WalletContants.INFO_SUCCESS:
      return {
        wallet_address: action.wallet_address,
        real_amount: action.real_amount,
        role: action.role,        
        available_amount: action.available_amount,
        used_tfa: action.used_tfa
      }
    case WalletContants.INFO_FAILURE:
      return {}
    case UserContants.GET_TFA_CODE_REQUEST:
      return state;
    case UserContants.GET_TFA_CODE_SUCCESS:
     return Object.assign({}, state, {
        'tfa_code': action.tfa_code,   
    });
    case UserContants.GET_TFA_CODE_FAILURE:
      return {}
    case UserContants.TURN_ON_TFA_REQUEST:
      return state;
    case UserContants.TURN_ON_TFA_SUCCESS:
    return Object.assign({}, state, {
      'used_tfa': true,   
    });
    case UserContants.TURN_ON_TFA_FAILURE:
      return {}
    default:
      return state;
  }
}
