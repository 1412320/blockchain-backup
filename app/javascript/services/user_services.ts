import { authenHeader } from '../helpers';
import axios from 'axios';

export const userServices = {
  signup,
  signin
}

function signup(user) {
  let response;
  axios.post('/users/signup', {
    data: JSON.stringify(user)
  })
  .then(function(r) {
    response = r;
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  return Promise.resolve(response);
}

function signin(email, password) {
  axios.post('/users/signin', {
    data: JSON.stringify(email, password)
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  .then(function(response) {
    return JSON.stringify(response);
  })
  .then(function(user:any) {
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  });
}
