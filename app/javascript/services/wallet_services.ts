import axios from 'axios';

export const walletServices = {
  getWalletInfo,
  getAllTransaction,
  getNewestTransaction,
  transferCoin
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

function transferCoin(transactions) {
  return new Promise((resolve, reject) => {
    axios.post('/transactions', {
      transcription: {
        sender_id: transactions.sender_id,
        recipient_id: transactions.recipient_id,
        amount: transactions.amount,
        description: transactions.description
      }
    })
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    })
  })
}
