import axios from 'axios';

export const transactionServices = {
  getMyTransaction,
  getNewestTransaction,
  getPendingTransaction,
  getTransactionDetail
}

function getMyTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/transactions/me')
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function getNewestTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/transactions?per_page=15')
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function getPendingTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/pending_transactions')
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function getTransactionDetail(t_id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/v1/transactions/${t_id}`)
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}
