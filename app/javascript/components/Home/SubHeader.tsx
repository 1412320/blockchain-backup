import * as React from 'react';
import { Button } from 'reactstrap';

interface SubHeaderProps {
  toggle() :void;
  wallet_id: string;
}

export default class SubHeader extends React.Component<SubHeaderProps, {}> {
  constructor(props: SubHeaderProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className="wallet-header">BE YOUR OWN BANK.
          <span className="wallet-copyright">®</span>
        </h3>
        <Button className="btn-wallet" onClick={this.props.toggle}>
          <i className="send-icon fa fa-paper-plane"></i>
          Send
        </Button>
        <span className="wallet-id"><strong>Wallet ID:</strong> {this.props.wallet_id}</span>
        <hr/>
      </div>
    );
  }
}
