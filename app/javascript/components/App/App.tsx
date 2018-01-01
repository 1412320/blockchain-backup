import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import { AuthenRouter } from '../../containers';
import { SignInPage } from '../SignIn';
import { SignUpPage } from '../SignUp';
import { Header } from '../Commons';

interface AppProps {
  dispatch: any,
  alert: {
    type: string,
    message: string
  }
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <div>
            <AuthenRouter exact path="/" component={Header} />
            <Route path="/users/sign_in" component={SignInPage} />
            <Route path="/users/sign_up" component={SignUpPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
