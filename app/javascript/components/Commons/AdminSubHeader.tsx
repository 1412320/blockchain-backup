import * as React from 'react';
import { Button } from 'reactstrap';


export class AdminSubHeader extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h3 className="wallet-header">ADMINISTRATOR.
          <span className="wallet-copyright">®</span>
        </h3>
        <hr/>
      </div>
    );
  }
}
