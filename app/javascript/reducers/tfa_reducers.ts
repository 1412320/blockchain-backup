import { UserContants } from '../contants';

export function tfa(state = {}, action) {
  switch(action.type) {
    case UserContants.GET_TFA_CODE_REQUEST:
      return {
      }
    case UserContants.GET_TFA_CODE_SUCCESS:
      return {
        tfa_code: action.tfa_code
      }
    case UserContants.GET_TFA_CODE_FAILURE:
      return {}
    default:
      return state;
  }
}
