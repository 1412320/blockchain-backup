import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

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
      <div className="login-pg">
        <h2 className="banner">BLOCKCHAIN</h2>
        <div className="login-box">
          <div className="row justify-content-between">
            <div className="col-md-4">
            <h2>Sign In</h2>
            </div>
          </div>
        <p className="description">Sign in to your wallet</p>
        <hr></hr>

          <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (is_submit && !email ? ' has-error' : '')}>
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
              {is_submit && !email &&
                  <div className="help-block">Username is required</div>
              }
            </div>
            <div className={'form-group' + (is_submit && !password ? ' has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {is_submit && !password &&
                  <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Signin</button>
              <Link to="/users/sign_up" className="btn btn-link">Sign Up</Link>
            </div>
          </form>

        </div>
      </div>
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
