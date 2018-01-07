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
    default:
      return state;
  }
}
