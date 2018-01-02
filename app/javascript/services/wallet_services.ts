import axios from 'axios';

export const walletServices = {
  getWalletInfo,
  getAllTransaction,
  getNewestTransaction
}

function getWalletInfo() {
  const token = JSON.parse(window.localStorage.getItem('user')).auth_token;
  return new Promise((resolve, reject) => {
    axios.get(`/wallet/${token}`)
    .then(response => {
      resolve(response);
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
