import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

import LoginContainer from '../../containers/LoginContainer';

interface ForgotPasswordProps {
  dispatch: any,
  title: string,
  desc: string
}

interface ForgotPasswordState {
  email: string,
  is_submit: boolean
}

class ForgotPasswordPage extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.props.dispatch(UserActions.signout());
    this.state = {
      email: '',
      is_submit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ is_submit: true });
    const { email} = this.state;
    const { dispatch } = this.props;
    if (email) {
      dispatch(UserActions.forgotpassword(email));
    }
  }
  render() {
    const { email, is_submit } = this.state;
    return (
      <LoginContainer title="Forgot password" desc="Forgot your password">
        <form name="form" onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" className={'form-control' + (is_submit && !email ? ' login-alert' : '')}
                   name="email" value={email} onChange={this.handleChange} />
            {is_submit && !email &&
              <div className="help-block">Email is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-login">Send reset password link</button>
            <Link to="/users/sign_up" className="btn btn-link">Sign up</Link>
            <Link to="/users/sign_in" className="btn btn-link">Sign in</Link>   
          </div>
        </form>
      </LoginContainer>
    );
  }
}
const connectedForgotPasswordPage = connect()(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage };
