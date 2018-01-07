import axios from 'axios';
import { authenHeader } from '../helpers';

export const adminServices = {
  getAllUsersInfo
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
      reject(error);
    })
  })
}