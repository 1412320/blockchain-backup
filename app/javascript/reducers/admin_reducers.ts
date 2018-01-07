import { AdminContants } from '../contants';


export function admin(state = {}, action) {
  switch(action.type) {
    case AdminContants.ALL_USERS_INFO_REQUEST:
      return {
      }
    case AdminContants.ALL_USERS_INFO_SUCCESS:
      return {
        users: action.users     
      }
    case AdminContants.ALL_USERS_INFO_FAILURE:
      return {}
    case AdminContants.SYSTEM_INFO_REQUEST:
    return {
    }
    case AdminContants.SYSTEM_INFO_SUCCESS:
      return {
        user_count: action.user_count,
        system_real_amount: action.system_real_amount,
        system_available_amount: action.system_available_amount     
      }
    case AdminContants.SYSTEM_INFO_FAILURE:
      return {}
    default:
      return state;
  }
}
