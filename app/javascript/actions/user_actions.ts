import { UserContants } from '../contants';
import { history, clear_alert } from '../helpers';
import { userServices } from '../services';
import { alertActions } from './';

export const UserActions = {
  signup,
  signin,
  signout,
  forgotpassword,
  resetpassword,
  get_tfa_code
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
            clear_alert(dispatch);
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
          dispatch(alertActions.success("Signin successfully"));
          clear_alert(dispatch);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
          clear_alert(dispatch);
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
            clear_alert(dispatch);
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            clear_alert(dispatch);
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
            clear_alert(dispatch);
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            clear_alert(dispatch);
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
function get_tfa_code() {
  return dispatch => {
    dispatch(request());
      userServices.get_tfa_code()
        .then(
          (response: {tfa_code: string}) => {
            dispatch(success(response.tfa_code));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request() {
    return {
      type: UserContants.GET_TFA_CODE_REQUEST,
    }
  }

  function success(tfa_code) {
    return {
      type: UserContants.GET_TFA_CODE_SUCCESS,
      tfa_code
    }
  }

  function failure(error) {
    return {
      type: UserContants.GET_TFA_CODE_FAILURE,
      error
    }
  }
}
