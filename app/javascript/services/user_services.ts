import { authenHeader } from '../helpers';
import axios from 'axios';

export const userServices = {
  signup,
  signin,
  signout
}

function signup(user) {
  let response;
  axios.post('/users/sign_up', {
    user: {
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    }
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
  axios.post('/users/sign_in', {
    user: {
      email: email,
      password: password
    }
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  .then(function(r) {
    response = r;
    console.log(r);
    return JSON.stringify(r);
  })
  .then(function(user:any) {
    if (user && user.auth_token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  });
  return Promise.resolve(response);
}

function signout() {
  localStorage.removeItem('user');
}
