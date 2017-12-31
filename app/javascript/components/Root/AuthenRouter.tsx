import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthenRouter = ({ component: Component, ...rest }) => {
  <Route {...rest} render = {props => (
      localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: 'users/signin', state: { from: props.location }}} />
  )}/>
}
