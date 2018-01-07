import axios from 'axios';
import { authenHeader } from '../helpers';

export const adminServices = {
  getAllUsersInfo,
  getSystemInfo
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
      console.log(error)
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
      console.log(error.response)
    })
  })
}