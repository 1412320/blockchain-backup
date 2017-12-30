import { AlertContants } from '../contants/alert_contants';
export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  return {
    type: AlertContants.SUCCESS,
    message
  };
}

function error(message) {
  return {
    type: AlertContants.ERROR,
    message
  };
}

function clear() {
  return {
    type: AlertContants.CLEAR
  };
}
