import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

import LoginContainer from '../../containers/LoginContainer';

interface SignInProps {
  dispatch: any,
  logged_in: boolean,
  title: string,
  desc: string
}

interface SignInState {
  email: string,
  password: string,
  is_submit: boolean
}

class SignInPage extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);
    this.props.dispatch(UserActions.signout());
    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(UserActions.signin(email, password));
    }
  }
  render() {
    const { logged_in } = this.props;
    const { email, password, is_submit } = this.state;
    return (
      <LoginContainer title="Sign In" desc="Sign in to your wallet">
        <form name="form" onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" className={'form-control' + (is_submit && !email ? ' login-alert' : '')}
                   name="email" value={email} onChange={this.handleChange} />
            {is_submit && !email &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" className={'form-control' + (is_submit && !password ? ' login-alert' : '')}
                   name="password" value={password} onChange={this.handleChange} />
            {is_submit && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-login">Continue</button>
            <Link to="/users/sign_up" className="btn btn-link">Sign Up</Link>
          </div>
        </form>
      </LoginContainer>
    );
  }
}

function mapStateToProps(state) {
    const { logged_in } = state.authentication;
    return {
        logged_in
    };
}

const connectedSignInPage = connect(mapStateToProps)(SignInPage);
export { connectedSignInPage as SignInPage };
