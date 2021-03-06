import { AdminContants } from '../contants';
const initState = { 
  users: [],
  user_count: 0,
  system_available_amount: 0,
  system_real_amount: 0,
  system_transactions: [],
  transaction_count: 0
};


export function admin(state = initState, action) {
  switch(action.type) {
    case AdminContants.ALL_USERS_INFO_REQUEST:
      return state;
    case AdminContants.ALL_USERS_INFO_SUCCESS:
      return Object.assign({}, state, {
        'users': action.users,
    });
    case AdminContants.ALL_USERS_INFO_FAILURE:
      return {}
    case AdminContants.SYSTEM_INFO_REQUEST:
    return state;
    case AdminContants.SYSTEM_INFO_SUCCESS:
      return Object.assign({}, state, {
        'user_count': action.user_count,
        'system_real_amount': action.system_real_amount,
        'system_available_amount': action.system_available_amount,        
    });
    case AdminContants.SYSTEM_INFO_FAILURE:
      return {}
    case AdminContants.CONFIRMED_TRANSACTIONS_REQUEST:
      return state;
    case AdminContants.CONFIRMED_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        'system_transactions': action.transactions,
        'transactions_count' : action.total
    });
    case AdminContants.CONFIRMED_TRANSACTIONS_FAILURE:
      return {}
    case AdminContants.PENDING_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        'system_transactions': []
    });
    case AdminContants.PENDING_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        'system_transactions': action.transactions,
        'transactions_count' : action.total
    });
    case AdminContants.PENDING_TRANSACTIONS_FAILURE:
      return {}
    default:
      return state;
  }
}
