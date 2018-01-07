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

export function verify_otp(state = {}, action) {
  switch (action.type) {
    case UserContants.OTP_REQUEST:
      return {}
    case UserContants.OTP_SUCCESS:
      return {
        
      }
    case UserContants.OTP_FAILURE:
      return {}
    default:
      return state;
  }
}
