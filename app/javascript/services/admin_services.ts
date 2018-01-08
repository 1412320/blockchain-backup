import axios from 'axios';
import { authenHeader } from '../helpers';

export const adminServices = {
  getAllUsersInfo,
  getSystemInfo,
  getTransactions,
  getPendingTransactions
}
function getAllUsersInfo(page)
{
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: '/api/v1/all-users-info',
      headers: authenHeader(),
      params: {"page_number": page}
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}
function getSystemInfo()
{
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: '/api/v1/system-info',
      headers: authenHeader(),
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}
function getTransactions(page)
{
  return new Promise((resolve, reject) => {
  axios({
      method: 'GET',
      url: '/api/v1/system-confirmed-transactions',
      headers: authenHeader(),
      params: {"page_number": page}
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}
function getPendingTransactions(page)
{
  return new Promise((resolve, reject) => {
  axios({
      method: 'GET',
      url: '/api/v1/system-pending-transactions',
      headers: authenHeader(),
      params: {"page_number": page}
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error.response.data.errors);
    })
  })
}