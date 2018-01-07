import { UserContants } from '../contants';
import { history } from '../helpers';
import { authenHeader } from '../helpers';
import { userServices } from '../services';
import { alertActions } from './';

export const UserActions = {
  signup,
  signin,
  signout, 
  forgotpassword,
  resetpassword
}

function signup(user) {
  return dispatch => {
    dispatch(request(user));
      userServices.signup(user)
        .then(
          user => {
            dispatch(success(user));
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

function signin(email, password) {
  return dispatch => {
    dispatch(request({ email }));
    userServices.signin(email, password)
      .then(
        user => {
          dispatch(success(user));
          dispatch(alertActions.clear());
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  }

  function request(user) {
    return {
      type: UserContants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: UserContants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: UserContants.LOGIN_FAILURE,
      error
    }
  }
}

function signout() {
  userServices.signout();
  return {
    type: UserContants.LOGOUT
  }
}
function forgotpassword(email) {
  return dispatch => {
    dispatch(request({email}));
      userServices.forgotpassword(email)
        .then(
          (response: {message: string}) => {
            dispatch(success(response.message));
            dispatch(alertActions.success(response.message));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(user) {
    return {
      type: UserContants.RESETPASSWORD_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: UserContants.RESETPASSWORD_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: UserContants.RESETPASSWORD_FAILURE,
      error
    }
  }
}
function resetpassword(user) {
  return dispatch => {
    dispatch(request({user}));
      userServices.resetpassword(user)
        .then(
          (response: {message: string}) => {
            dispatch(success(response.message));
            dispatch(alertActions.success(response.message));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(user) {
    return {
      type: UserContants.RESETPASSWORD_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: UserContants.RESETPASSWORD_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: UserContants.RESETPASSWORD_FAILURE,
      error
    }
  }
}