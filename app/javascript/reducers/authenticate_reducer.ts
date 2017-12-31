import { UserContants } from '../contants';

let user = JSON.parse(localStorage.getItem('user'));
const initState = user ? { logged_in: true, user } : {};

export function authentication(state = initState, action) {
  switch (action.type) {
    case UserContants.LOGIN_REQUEST:
      return {
        logged_in: true,
        user: action.user
      };
    case UserContants.LOGIN_SUCCESS:
      return {
        logged_in: true,
        user: action.user
      };
    case UserContants.LOGIN_FAILURE:
      return {};
    case UserContants.LOGOUT:
      return {};
    default:
      return state;
  }
}
