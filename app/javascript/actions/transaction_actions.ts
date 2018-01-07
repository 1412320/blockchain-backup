import { TransactionContants } from '../contants';
import { transactionServices } from '../services';

export const transactionActions = {
  getMy,
  getNewest,
  getPending
}

function getMy() {
  return dispatch => {
    dispatch(request());
    transactionServices.getMyTransaction()
      .then(
        transactions => {
          dispatch(success(transactions))
        },
        error => {
          dispatch(failure(error));
        }
    );
  }
  function request() {
    return {
      type: TransactionContants.ME_REQUEST
    }
  }

  function success(transactions) {
    return {
      type: TransactionContants.ME_SUCCESS,
      transactions
    }
  }

  function failure(error) {
    return {
      type: TransactionContants.ME_FAILURE,
      error
    }
  }
}

function getNewest() {
  return dispatch => {
    dispatch(request());
    transactionServices.getNewestTransaction()
      .then(
        transactions => {
          dispatch(success(transactions))
        },
        error => {
          dispatch(failure(error));
        }
    );
  }
  function request() {
    return {
      type: TransactionContants.ME_REQUEST,
    }
  }

  function success(transactions) {
    return {
      type: TransactionContants.ME_SUCCESS,
      transactions
    }
  }

  function failure(error) {
    return {
      type: TransactionContants.ME_FAILURE,
      error
    }
  }
}

function getPending() {
  return dispatch => {
    dispatch(request());
    transactionServices.getPendingTransaction()
      .then(
        transactions => {
          dispatch(success(transactions))
        },
        error => {
          dispatch(failure(error));
        })
  };
  function request() {
    return {
      type: TransactionContants.ME_REQUEST
    }
  }

  function success(transactions) {
    return {
      type: TransactionContants.ME_SUCCESS,
      transactions
    }
  }

  function failure(error) {
    return {
      type: TransactionContants.ME_FAILURE,
      error
    }
  }
}
