import { WalletContants } from '../contants';
import { walletServices } from '../services';
import { alertActions } from '../actions';
import { clear_alert } from '../helpers';

export const walletActions = {
  getInfo,
  transfer
}

function getInfo() {
  return dispatch => {
    dispatch(request());
    walletServices.getWalletInfo()
      .then(
        (response: {wallet_address: string, real_amount: number, available_amount: number, role: number, used_tfa: boolean}) => {
          dispatch(success(response.wallet_address, response.real_amount, response.available_amount, response.role, response.used_tfa))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error));
          clear_alert(dispatch);
        }
      );
  }
  function request() {
    return {
      type: WalletContants.INFO_REQUEST
    }
  }

  function success(wallet_address, real_amount, available_amount, role, used_tfa) {
    return {
      type: WalletContants.INFO_SUCCESS,
      wallet_address,
      real_amount,
      role,
      available_amount,
      used_tfa
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
          clear_alert(dispatch);
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
