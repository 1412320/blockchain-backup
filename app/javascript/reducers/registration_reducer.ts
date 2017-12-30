import { UserContants } from '../contants';

export function registration(state = {}, action) {
  switch (action.type) {
    case UserContants.SIGNUP_REQUEST:
      return {
        is_regis: true
      };
    case UserContants.SIGN_UP_SUCCESS:
      return {};
    case UserContants.SIGNUP_FAILURE:
      return {};
    default:
      return state;
  }
}
