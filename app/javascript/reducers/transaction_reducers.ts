import { TransactionContants } from '../contants';

export function get_my(state = {}, action) {
  switch(action.type) {
    case TransactionContants.ME_REQUEST:
      return {
        transactions: {
          hash: action.hash,
          sender: action.sender,
          receiver: action.receiver,
          value: action.value
        }
      }
    case TransactionContants.ME_SUCCESS:
      return {
        transactions: action.transactions
      }
    case TransactionContants.ME_FAILURE:
      return {}
    default:
      return state;
  }
}

export function get_pending(state = {}, action) {
  switch(action.type) {
    case TransactionContants.PENDING_REQUEST:
      return {
        transactions: {
          id: action.id,
          sender: action.sender,
          receiver: action.receiver,
          value: action.value
        }
      }
    case TransactionContants.PENDING_SUCCESS:
      return {
        transactions: {
          id: action.id,
          sender: action.sender,
          receiver: action.receiver,
          value: action.value
        }
      }
    case TransactionContants.PENDING_FAILURE:
      return {}
    default:
      return state;
  }
}

export function get_detail(state = {}, action) {
  switch(action.type) {
    case TransactionContants.DETAIL_REQUEST:
      return {}
    case TransactionContants.DETAIL_SUCCESS:
      return {
        transaction: action.transaction
      }
    case TransactionContants.DETAIL_FAILURE:
      return {}
    default:
      return state;
  }
}
