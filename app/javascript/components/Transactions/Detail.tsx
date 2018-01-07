import * as React from 'react';
import { Input, Card, CardTitle, CardText, Table } from 'reactstrap';
import { Header } from '../Commons';

export class Detail extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Header>
        <div className="wallet-card">
          <Card>
            <CardTitle>TRANSACTION DETAIL</CardTitle>
            <CardText>
              <div className="card-table">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardText>
          </Card>
        </div>
      </Header>
    );
  }
}
