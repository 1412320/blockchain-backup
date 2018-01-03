export function authenHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return {
      'Authorization': user.auth_token
    };
  }
  else {
    return {};
  }
}
