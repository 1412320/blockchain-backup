export function authenHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user.auth_token)
  if (user) {
    return {
      'Authorization': user.auth_token
    };
  }
  else {
    return {};
  }
}
