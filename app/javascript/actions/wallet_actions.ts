import { WalletContants } from '../contants';
import { walletServices } from '../services';
import { alertActions } from '../actions';

export const walletActions = {
  getInfo,
  getAll,
  getNewest,
  transfer
}

function getInfo() {
  return dispatch => {
    dispatch(request());
    walletServices.getWalletInfo()
      .then(
        (response: {wallet_address: string, real_amount: number}) => {
          dispatch(success(response.wallet_address, response.real_amount))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error));
        }
      );
  }
  function request() {
    return {
      type: WalletContants.INFO_REQUEST
    }
  }

  function success(wallet_address, real_amount) {
    return {
      type: WalletContants.INFO_SUCCESS,
      wallet_address,
      real_amount
    }
  }

  function failure(error) {
    return {
      type: WalletContants.INFO_FAILURE,
      error
    }
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());
    walletServices.getAllTransaction()
      .then(
        dispatch(success())
      )
      .catch(
        dispatch(failure())
      );
  }
  function request() {
    return {
      type: WalletContants.ALL_REQUEST
    }
  }

  function success() {
    return {
      type: WalletContants.ALL_SUCCESS
    }
  }

  function failure() {
    return {
      type: WalletContants.ALL_FAILURE
    }
  }
}

function getNewest() {
  return dispatch => {
    dispatch(request());
    walletServices.getNewestTransaction()
      .then(
        dispatch(success())
      )
      .catch(
        dispatch(failure())
      );
  }
  function request() {
    return {
      type: WalletContants.NEWEST_REQUEST
    }
  }

  function success() {
    return {
      type: WalletContants.NEWEST_SUCCESS
    }
  }

  function failure() {
    return {
      type: WalletContants.NEWEST_FAILURE
    }
  }
}

function transfer(transactions) {
  return dispatch => {
    dispatch(request(transactions));
    walletServices.transferCoin(transactions)
      .then(
        transactions => {
          dispatch(success(transactions))
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }
  function request(transactions) {
    return {
      type: WalletContants.TRANSFER_REQUEST,
      transactions
    }
  }

  function success(transactions) {
    return {
      type: WalletContants.TRANSFER_SUCCESS,
      transactions
    }
  }

  function failure(error) {
    return {
      type: WalletContants.TRANSFER_FAILURE,
      error
    }
  }
}
