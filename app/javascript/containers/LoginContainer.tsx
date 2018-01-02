import * as React from 'react';
import { connect } from 'react-redux';

interface LoginContainerProps {
  title: string;
  desc: string;
}

export default class LoginContainer extends React.Component<LoginContainerProps, {}> {
  constructor(props: LoginContainerProps) {
    super(props);
  }
  render() {
    return(
      <div className="login-pg">
        <h2 className="banner">BLOCKCHAIN</h2>
        <div className="login-box">
          <div className="row justify-content-between">
            <div className="col-md-4">
            <h2>{this.props.title}</h2>
            </div>
          </div>
        <p className="description">{this.props.desc}</p>
        <hr></hr>
          {this.props.children}
        </div>
      </div>
    );
  }
}
