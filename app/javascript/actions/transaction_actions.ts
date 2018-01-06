import { TransactionContants } from '../contants';
import { transactionServices } from '../services';

export const transactionAction = {
  getMy,
  getNewest,
  getPending
}

function getMy() {
  return dispatch => {
    dispatch(request());
    transactionServices.getMyTransaction()
      .then(
        dispatch(success())
      )
      .catch(
        dispatch(failure())
      );
  }
  function request() {
    return {
      type: TransactionContants.ME_REQUEST
    }
  }

  function success() {
    return {
      type: TransactionContants.ME_SUCCESS
    }
  }

  function failure() {
    return {
      type: TransactionContants.ME_FAILURE
    }
  }
}

function getNewest() {
  return dispatch => {
    dispatch(request());
    transactionServices.getNewestTransaction()
      .then(
        dispatch(success())
      )
      .catch(
        dispatch(failure())
      );
  }
  function request() {
    return {
      type: TransactionContants.NEWEST_REQUEST
    }
  }

  function success() {
    return {
      type: TransactionContants.NEWEST_SUCCESS
    }
  }

  function failure() {
    return {
      type: TransactionContants.NEWEST_FAILURE
    }
  }
}

function getPending() {
  return dispatch => {
    dispatch(request());
    transactionServices.getNewestTransaction()
      .then(
        dispatch(success())
      )
      .catch(
        dispatch(failure())
      );
  }
  function request() {
    return {
      type: TransactionContants.PENDING_REQUEST
    }
  }

  function success() {
    return {
      type: TransactionContants.PENDING_SUCCESS
    }
  }

  function failure() {
    return {
      type: TransactionContants.PENDING_FAILURE
    }
  }
}
