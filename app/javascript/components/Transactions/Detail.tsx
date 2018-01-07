import * as React from 'react';
import { Modal, ModalBody, ModalHeader, Input,
         Card, CardTitle, CardText, Table } from 'reactstrap';

interface DetailStates {
  modal: boolean
}

export class Detail extends React.Component<{}, DetailStates> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }

  closeModal() {
    this.setState({
      modal: false
    })
  }

  openModal() {
    this.setState({
      modal: true
    })
  }

  render() {
    return(
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
    );
  }
}
