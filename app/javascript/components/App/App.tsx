import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenHeader } from '../../helpers';
import { history } from '../../helpers';
import { alertActions } from '../../actions';
import { AuthenRouter } from '../../containers';
import { SignInPage } from '../SignIn';
import { SignUpPage } from '../SignUp';
import { ForgotPasswordPage } from '../ResetPassword';
import { ResetPasswordPage } from '../ResetPassword';
import { Header } from '../Commons';
import { HomeContainer } from '../../containers';
import { Detail } from '../Transactions';

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

  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type == 'alert-error' ? 'alert-danger' : 'alert-success'} `}>{alert.message}</div>
        }
        <HashRouter>
          <div>
            <AuthenRouter exact path="/" component={HomeContainer} />
            <Route path="/users/sign_in" component={SignInPage} />
            <Route path="/users/sign_up" component={SignUpPage} />
            <Route path="/users/password/new" component={ForgotPasswordPage} />
            <Route path="/password_reset" component={ResetPasswordPage} />
            <Route path="/transactions/:id" component={Detail}/>
          </div>
        </HashRouter>
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
