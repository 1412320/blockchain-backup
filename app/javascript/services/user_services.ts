import { authenHeader } from '../helpers';
import axios from 'axios';

export const userServices = {
  signup
}

function signup(user) {
  let response
  axios.post('/users/signup', {
    body: JSON.stringify(user)
  })
  .then(function(r) {
    response = r;
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  return Promise.resolve(response);
}
