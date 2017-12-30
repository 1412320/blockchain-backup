import { authenHeader } from '../helpers';
import axios from 'axios';

function signup(user) {
  axios.post('/users/signup', {
    body: JSON.stringify(user)
  })
  .then(function(response) {
    return response;
  })
  .catch(function(error) {
    return error;
  })
}
