import * as React from 'react';
import { connect } from 'react-redux';
import { Input, Card, CardTitle, CardText, Table } from 'reactstrap';
import { Header } from '../Commons';
import { transactionActions } from '../../actions';

interface DetailProps {
  dispatch: any,
  transaction: DetailInfo
}

interface DetailState {
  transaction: DetailInfo
}

interface DetailInfo {
  hash: string,
  inputs: Array<InputInfo>,
  outputs: Array<OutputInfo>
}

interface InputInfo {
  outputHash: string,
  outputIndex: number
}

interface OutputInfo {
  value: number,
  to: string
}

class Detail extends React.Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {
      transaction: this.props.transaction
    }
  }

  componentWillMount() {
    const t_id = window.location.hash.split("/")[2];
    this.props.dispatch(transactionActions.getDetail(t_id));
  }

  render() {
    return(
      <Header>
        <div className="wallet-card">
          <Card className="card-transaction">
            <CardTitle>TRANSACTION DETAIL</CardTitle>
            { this.props.transaction ?
              <div>
                <CardText><strong>Hash: </strong>{this.props.transaction.hash}</CardText>
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
                        <td>a</td>
                        <td>a</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              : null
            }
          </Card>
        </div>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  const { transaction } = state.get_detail;
  return {
    transaction
  };
}

const connectedDetail = connect(mapStateToProps)(Detail);
export { connectedDetail as Detail };
