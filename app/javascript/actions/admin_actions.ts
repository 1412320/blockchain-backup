import { AdminContants } from '../contants';
import { adminServices } from '../services';
import { alertActions } from './';
import { TransactionInfo } from '../containers';
import { clear_alert } from '../helpers';

export const adminActions = {
  getAllUsersInfo,
  getSystemInfo,
  getTransactions,
  getPendingTransactions
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
            dispatch(failure(error));
            dispatch(alertActions.error(error));
            clear_alert(dispatch);
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
            clear_alert(dispatch);
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
function getTransactions(page) {
  return dispatch => {
    dispatch(request({page}));
    adminServices.getTransactions(page)
        .then(
          (response: {transactions: Array<TransactionInfo>, total:number}) => {
            dispatch(success(response.transactions, response.total));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(page) {
    return {
      type: AdminContants.CONFIRMED_TRANSACTIONS_REQUEST,
    }
  }

  function success(transactions, total) {
    return {
      type: AdminContants.CONFIRMED_TRANSACTIONS_SUCCESS,
      transactions,
      total
    }
  }

  function failure(error) {
    return {
      type: AdminContants.CONFIRMED_TRANSACTIONS_FAILURE,
      error
    }
  }
}
function getPendingTransactions(page) {
  return dispatch => {
    dispatch(request({page}));
    adminServices.getPendingTransactions(page)
        .then(
          (response: {transactions: Array<TransactionInfo>, total:number}) => {
            dispatch(success(response.transactions, response.total));
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
  }

  function request(page) {
    return {
      type: AdminContants.PENDING_TRANSACTIONS_REQUEST,
    }
  }

  function success(transactions, total) {
    return {
      type: AdminContants.PENDING_TRANSACTIONS_SUCCESS,
      transactions,
      total
    }
  }

  function failure(error) {
    return {
      type: AdminContants.PENDING_TRANSACTIONS_FAILURE,
      error
    }
  }
}
