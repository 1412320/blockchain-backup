import axios from 'axios';

export const transactionServices = {
  getMyTransaction,
  getNewestTransaction,
  getPendingTransaction,
  getTransactionDetail,
  confirmTransaction
}

function getMyTransaction() {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/transactions/me')
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
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
      reject(error.response.data.errors);
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
      reject(error.response.data.errors);
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
      reject(error.response.data.errors);
    })
  })
}

function confirmTransaction(t_id, otp_code) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/v1/pending_transactions/${t_id}/confirm`, {
      otp_code: otp_code
    })
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}

function deleteTransaction(t_id) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/v1/pending_transactions/${t_id}`)
    .then(response => {
      resolve(response.data.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}
