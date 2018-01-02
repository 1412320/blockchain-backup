import { authenHeader } from '../helpers';
import axios from 'axios';

export const userServices = {
  signup,
  signin,
  signout
}

function signup(user) {
  let response;
  axios.post('/users', {
    user: {
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    }
  })
  .then(function(r) {
    response = r;
    location.href = "/users/sign_in";
  })
  .catch(function(error) {
    return Promise.reject(error);
  })
  return Promise.resolve(response);
}

function signin(email, password){
  let response;
  let error;
  return new Promise((resolve, reject) => {
    axios.post('/users/sign_in', {
      user: {
        email: email,
        password: password
      }
    })
    .catch(function(e) {
      error = e.response.data.errors;
      reject(error);
    })
    .then(function(r) {
      response = r;
      return JSON.stringify(r);
    })
    .then(function(user:any) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        location.href = "/";
      }
      resolve(user);
    });
  })
}

function signout() {
  localStorage.removeItem('user');
}
