import { WalletContants } from '../contants';

export function transfer_kcoin(state = {}, action) {
  switch (action.type) {
    case WalletContants.TRANSFER_REQUEST:
      return {
        recipient_id: action.recipient_id,
        amount: action.amount,
      }
    case WalletContants.TRANSFER_SUCCESS:
      return {
        recipient_id: action.recipient_id,
        amount: action.amount,
      }
    case WalletContants.TRANSFER_FAILURE:
      return {}
    default:
      return state;
  }
}
