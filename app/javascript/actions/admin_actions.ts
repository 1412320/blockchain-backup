import { AdminContants } from '../contants';
import { adminServices } from '../services';
import { alertActions } from './';

export const adminActions = {
  getAllUsersInfo,
  getSystemInfo,
}
function getAllUsersInfo(page) {
  return dispatch => {
    dispatch(request({page}));
    adminServices.getAllUsersInfo(page)
        .then(
          (response) => {
            dispatch(success(response));
          },
          error => {
            console.log(error)
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(page) {
    return {
      type: AdminContants.ALL_USERS_INFO_REQUEST,
    }
  }

  function success(users) {
    return {
      type: AdminContants.ALL_USERS_INFO_SUCCESS,
      users
    }
  }

  function failure(error) {
    return {
      type: AdminContants.ALL_USERS_INFO_FAILURE,
      error
    }
  }
}
function getSystemInfo() {
  return dispatch => {
    dispatch(request());
    adminServices.getSystemInfo()
        .then(
          (response: {user_count: number, system_real_amount: number, system_available_amount: number}) => {
            dispatch(success(response.user_count, response.system_real_amount, response.system_available_amount));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request() {
    return {
      type: AdminContants.SYSTEM_INFO_REQUEST,
    }
  }

  function success(user_count, system_real_amount, system_available_amount) {
    return {
      type: AdminContants.SYSTEM_INFO_SUCCESS,
      user_count,
      system_real_amount,
      system_available_amount
    }
  }

  function failure(error) {
    return {
      type: AdminContants.SYSTEM_INFO_FAILURE,
      error
    }
  }
}