import axios from 'axios';

export function authenHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    axios.defaults.headers.common['Authorization'] = user.auth_token;
    return {
      'Authorization': user.auth_token
    };
  }
  else {
    return {};
  }
}
