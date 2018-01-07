import axios from 'axios';
import { authenHeader } from '../helpers';

export const userServices = {
  signup,
  signin,
  signout,
  forgotpassword,
  resetpassword,
  get_tfa_code,
  turn_on_tfa
}

function signup(user) {
  let response;
  return new Promise((resolve, reject) => {
    axios.post('/users', {
      user: {
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation
      }
    })
    .then(function(r) {
      response = r;
      location.hash = "/users/sign_in";
    })
    .catch(function(error) {
      reject(error.response.data.errors[0]);
    })
  })
}

function signin(email, password) {
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
      return r;
    })
    .then(function(user:any) {
      if (user.data.auth_token) {
        localStorage.setItem('user', JSON.stringify(user.data));
        location.hash = "/";
      }
      resolve(user.data);
    });
  })
}

function signout() {
  localStorage.removeItem('user');
}
function forgotpassword(email) {
  let response;
  return new Promise((resolve, reject) => {
    axios.post('/users/password', {
      user: {
        email: email,
      }
    })
    .then(function(r) {
      location.hash = "/users/sign_in";
      resolve(r.data)
    })
    .catch(function(error) {
      reject(error.response.data.errors);
    })
  })
}
function resetpassword(user) {
  let response;
  return new Promise((resolve, reject) => {
    axios.put('/users/password', {
      user: {
        password: user.password,
        password_confirmation: user.password_confirmation,
        reset_password_token: user.reset_password_token
      }
    })
    .then(function(r) {
      resolve(r.data);
      location.hash = "/users/sign_in";
    })
    .catch(function(error) {
      reject(error.response.data.errors);
    })
  })
}
function get_tfa_code()
{
  return new Promise((resolve, reject) => {
  axios({
      method: 'GET',
      url: '/api/v1/get-tfa-code',
      headers: authenHeader(),
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}
function turn_on_tfa()
{
  return new Promise((resolve, reject) => {
  axios({
      method: 'POST',
      url: '/api/v1/turn-on-tfa',
      headers: authenHeader(),
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}