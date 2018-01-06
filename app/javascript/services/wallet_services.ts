import axios from 'axios';
import { authenHeader } from '../helpers';

export const walletServices = {
  getWalletInfo,
  getAllTransaction,
  getNewestTransaction,
  transferCoin
}

function getWalletInfo() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: '/api/v1/wallet',
      headers: authenHeader()
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function getAllTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/transactions/newest')
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function getNewestTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/transactions/all')
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function transferCoin(transactions) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/transactions', {
      sender: transactions.sender_id,
      receiver: transactions.recipient_id,
      amount: parseInt(transactions.amount)
    })
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      console.log(error);
      reject(error.response.statusText);
    })
  })
}
