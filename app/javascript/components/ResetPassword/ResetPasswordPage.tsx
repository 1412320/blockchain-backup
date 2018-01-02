import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

import LoginContainer from '../../containers/LoginContainer';

interface ResetPasswordProps {
  dispatch: any,
  title: string,
  desc: string
}

interface ResetPasswordState {
  user: {
    reset_password_token: string,
    password: string,
    password_confirmation: string,
  },  
  is_submit: boolean
}

class ResetPasswordPage extends React.Component<ResetPasswordProps, ResetPasswordState> {
  constructor(props: ResetPasswordProps) {
    super(props);
    this.props.dispatch(UserActions.signout());
    this.state = {
      user: {
        reset_password_token: '',
        password: '',
        password_confirmation: ''
      },     
      is_submit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }
  getUrlParameter(){
    var token = window.location.hash.split('=')[1]
    return token
  };
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.getUrlParameter())
    this.setState( {
      is_submit: true,
      user: {
        reset_password_token: this.getUrlParameter(),
        password: this.state.user.password,
        password_confirmation: this.state.user.password_confirmation      
      }
    }, () => {
      const {user} = this.state;
      console.log("jdnskda"  + this.state.user.reset_password_token)
      const { dispatch } = this.props;
      if (user.reset_password_token && user.password && user.password_confirmation) {
        dispatch(UserActions.resetpassword(user));
      }
    });    
  }
  render() {
    const { user, is_submit } = this.state;
    return (
      <LoginContainer title="Forgot password" desc="Forgot your password">
        <form name="form" onSubmit={this.handleSubmit}>
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
            <button className="btn btn-login">Reset password</button>
            <Link to="/users/sign_up" className="btn btn-link">Send reset password link</Link>
          </div>
        </form>
      </LoginContainer>
    );
  }
}
const connectedResetPasswordPage = connect()(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage };
