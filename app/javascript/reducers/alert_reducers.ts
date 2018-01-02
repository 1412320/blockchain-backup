import { AlertContants } from '../contants';

export function alert(state = {}, action) {
  switch (action.type) {
    case AlertContants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case AlertContants.ERROR:
      return {
        type: 'alert-error',
        message: action.message
      };
    case AlertContants.CLEAR:
      return { };
    default:
      return state;
  }
}
