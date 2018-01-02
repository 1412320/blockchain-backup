import axios from 'axios';

export const userServices = {
  signup,
  signin,
  signout, 
  forgotpassword,
  resetpassword
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
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        location.hash = "/";
      }
      resolve(user);
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