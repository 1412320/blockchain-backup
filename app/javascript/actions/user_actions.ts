import { UserContants } from '../contants';
import { history } from 'history';
import { authenHeader } from '../helpers';
import { userServices } from '../services';
import { alertActions } from './';

export const UserActions = {
  signup
}

export function signup(user) {
  return dispatch => {
    dispatch(request(user));
      userServices.signup(user)
        .then(
          user => {
            dispatch(success(user));
            history.push('/users/signup');
            dispatch(alertActions.success('Signup successful'));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(user) {
    return {
      type: UserContants.SIGNUP_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: UserContants.SIGN_UP_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: UserContants.SIGNUP_FAILURE,
      error
    }
  }
}
