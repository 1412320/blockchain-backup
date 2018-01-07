import { AdminContants } from '../contants';
import { adminServices } from '../services';
import { alertActions } from './';

export const adminActions = {
  getAllUsersInfo
}
function getAllUsersInfo(page) {
  return dispatch => {
    dispatch(request({page}));
    adminServices.getAllUsersInfo(page)
        .then(
          (response) => {
            dispatch(success(response));
            dispatch(alertActions.success("success"));
          },
          error => {
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