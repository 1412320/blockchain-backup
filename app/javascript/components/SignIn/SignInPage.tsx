import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import { UserActions } from '../../actions';

import LoginContainer from '../../containers/LoginContainer';

interface SignInProps {
  dispatch: any,
  logged_in: boolean,
  title: string,
  desc: string,
  used_tfa: boolean,
  user_id: number
}

interface SignInState {
  email: string,
  password: string,
  is_submit: boolean,
  used_tfa: boolean,
  input_tfa: string,
}

class SignInPage extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      is_submit: false,
      used_tfa: false,
      input_tfa: ""
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
    this.setState({ is_submit: true, used_tfa: false });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(UserActions.signin(email, password));
    }
  }
  toggle()
  {
    this.setState({
      used_tfa: true
    })
  }
  submitTFA(e){
    e.preventDefault();    
    const { dispatch } = this.props;    
    if (this.state.input_tfa) {
      this.props.dispatch(UserActions.authenticate_2_step(this.props.user_id, this.state.input_tfa));
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
            <Link to="/users/password/new" className="btn btn-link">Forgot your password</Link>
            <Link to="/users/sign_up" className="btn btn-link">Sign Up</Link>
          </div>
        </form>
        <Modal isOpen={this.state.used_tfa ? !this.state.used_tfa : this.props.used_tfa} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>
            <i className="send-icon fa fa-paper-plane"></i>
            Google Authenticator
          </ModalHeader>
          <hr/>
          <ModalBody>
            <Form className="wallet-form" onSubmit={this.submitTFA.bind(this)}>
              <FormGroup>
                <Label for="recipient-id">Enter the code (6 number) in your google authenticator app </Label>
                <Input type="text" name="input_tfa" value={this.state.input_tfa}
                 placeholder="Paste TFA code"
                 onChange={this.handleChange}/>
              </FormGroup>
              <hr/>
              <Button type="submit" className="wallet-submit">CONTINUE</Button>
            </Form>
          </ModalBody>
        </Modal>
      </LoginContainer>
    );
  }
}

function mapStateToProps(state) {
    const { logged_in,used_tfa, user_id } = state.authentication;
    return {
        logged_in,
        used_tfa,
        user_id
    };
}

const connectedSignInPage = connect(mapStateToProps)(SignInPage);
export { connectedSignInPage as SignInPage };
