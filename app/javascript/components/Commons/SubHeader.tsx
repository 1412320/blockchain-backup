import * as React from 'react';
import { Button } from 'reactstrap';

interface SubHeaderProps {
  wallet_address: string;
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
        <span className="wallet-id"><strong>Wallet ID:</strong> {this.props.wallet_address}</span>
        <hr/>
      </div>
    );
  }
}
