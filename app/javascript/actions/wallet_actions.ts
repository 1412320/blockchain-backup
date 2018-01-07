import { WalletContants } from '../contants';
import { walletServices } from '../services';
import { alertActions } from '../actions';

export const walletActions = {
  getInfo,
  transfer
}

function getInfo() {
  return dispatch => {
    dispatch(request());
    walletServices.getWalletInfo()
      .then(
        (response: {wallet_address: string, real_amount: number, available_amount: number}) => {
          dispatch(success(response.wallet_address, response.real_amount, response.available_amount))
          dispatch(walletServices.getWalletInfo());
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

  function success(wallet_address, real_amount, available_amount) {
    return {
      type: WalletContants.INFO_SUCCESS,
      wallet_address,
      real_amount,
      available_amount
    }
  }

  function failure(error) {
    return {
      type: WalletContants.INFO_FAILURE,
      error
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
