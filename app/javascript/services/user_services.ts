import { authenHeader } from '../helpers';
import axios from 'axios';

export const userServices = {
  signup,
  signin,
  signout
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
  let response;
  axios.post('/users/signin', {
    data: JSON.stringify(email, password)
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  .then(function(r) {
    response = r;
    return JSON.stringify(r);
  })
  .then(function(user:any) {
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  });
  return Promise.resolve(response);
}

function signout() {
  localStorage.removeItem('user');
}
