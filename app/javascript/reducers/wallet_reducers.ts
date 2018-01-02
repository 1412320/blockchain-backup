import { WalletContants } from '../contants';

const initState = {
  wallet_id: '',
  balance: 0,
  sender: '',
  recipient: '',
  description: '',
  amount: 0
}

export function getInfo(state = initState, action) {
  switch(action.type) {
    case WalletContants.INFO:
      return {
        wallet_id: action.wallet_id,
        balance: action.balance
      }
    case WalletContants.ALL, WalletContants.NEWEST:
      return {
        sender: action.sender,
        recipient: action.recipient,
        description: action.description,
        amount: action.amount
      }
    default:
      return state;
  }
}
