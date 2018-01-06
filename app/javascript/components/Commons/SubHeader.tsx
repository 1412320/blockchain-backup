import * as React from 'react';
import { Button } from 'reactstrap';

interface SubHeaderProps {
  wallet_address: string,
  toggle() :void
}

export class SubHeader extends React.Component<SubHeaderProps, {}> {
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
          Send KCOIN
        </Button>
        <span className="wallet-id"><strong>Wallet ID:</strong> {this.props.wallet_address}</span>
        <hr/>
      </div>
    );
  }
}
