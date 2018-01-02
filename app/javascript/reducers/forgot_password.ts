import { UserContants } from '../contants';

export function resetpassword(state = {}, action) {
  switch (action.type) {
    case UserContants.RESETPASSWORD_REQUEST:
      return {
      };
    case UserContants.RESETPASSWORD_SUCCESS:
      return {};
    case UserContants.RESETPASSWORD_FAILURE:
      return {};
    case UserContants.FORGOTPASSWORD_REQUEST:
      return {
      };
    case UserContants.FORGOTPASSWORD_SUCCESS:
      return {};
    case UserContants.FORGOTPASSWORD_FAILURE:
      return {};
    default:
      return state;
  }
}
