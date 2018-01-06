import { WalletContants } from '../contants';


export function get_info(state = {}, action) {
  switch(action.type) {
    case WalletContants.INFO_REQUEST:
      return {
        wallet_address: action.wallet_address,
        real_amount: action.real_amount,
        role: action.role
      }
    case WalletContants.INFO_SUCCESS:
      return {
        wallet_address: action.wallet_address,
        real_amount: action.real_amount,
        role: action.role        
      }
    case WalletContants.INFO_FAILURE:
      return {}
    default:
      return state;
  }
}
