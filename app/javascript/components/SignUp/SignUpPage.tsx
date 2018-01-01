import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

import LoginContainer from '../../containers/LoginContainer';

interface SignUpProps {
  dispatch: any,
  registering: boolean
}

interface SignUpState {
  user: {
    email: string,
    password: string,
    password_confirmation: string,
  },
  is_submit: boolean
}

class SignUpPage extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      is_submit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ is_submit: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.password && user.password_confirmation && user.password == user.password_confirmation) {
      dispatch(UserActions.signup(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, is_submit } = this.state;
    return(
      <LoginContainer title="Sign Up" desc="Create a free wallet">
        <form name="form" onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" className={ 'form-control' + (is_submit && !user.email ? ' login-alert' : '')}
                   name="email" value={user.email} onChange={this.handleChange} />
            {
              is_submit && !user.email &&
              <div className="help-block">Email is required</div>
            }
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" className={'form-control'  + (is_submit && !user.password ? ' login-alert' : '')}
                   name="password" value={user.password} onChange={this.handleChange} />
            {is_submit && !user.password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className='form-group'>
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input type="password" className={'form-control' + (is_submit && !user.password_confirmation ? ' login-alert' : '')}
                   name="password_confirmation" value={user.password_confirmation} onChange={this.handleChange} />
            {is_submit && !user.password_confirmation &&
              <div className="help-block">Password confirmation is required</div>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-login">Register</button>
            <Link to="/users/sign_in" className="btn btn-link">Sign In</Link>
          </div>
        </form>
      </LoginContainer>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(SignUpPage);
export { connectedRegisterPage as SignUpPage };
