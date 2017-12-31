import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { UserActions } from '../../actions';

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
    const { registering  } = this.props;
    const { user, is_submit } = this.state;
    return(
      <div className="col-md-6 col-md-offset-3">
        <h2>Signup</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (is_submit && !user.email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
            {
              is_submit && !user.email &&
              <div className="help-block">Email is required</div>
            }
          </div>

          <div className={'form-group' + (is_submit && !user.password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
            {is_submit && !user.password &&
                <div className="help-block">Password is required</div>
            }
          </div>

          <div className={'form-group' + (is_submit && !user.password_confirmation ? ' has-error' : '')}>
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input type="password" className="form-control" name="password_confirmation" value={user.password_confirmation} onChange={this.handleChange} />
            {is_submit && !user.password_confirmation &&
                <div className="help-block">Password confirmation is required</div>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/users/sign_up" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </div>
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
