import { alertActions } from '../actions';

export function clear_alert(dispatch) {
  setTimeout(() => {
    dispatch(alertActions.clear());
  }, 5000)
}
