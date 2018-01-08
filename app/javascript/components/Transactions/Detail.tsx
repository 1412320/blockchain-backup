import * as React from 'react';
import { connect } from 'react-redux';
import { Input, Card, CardTitle, CardText, Table } from 'reactstrap';
import { Header, Footer } from '../Commons';
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
      <div>
        <Header></Header>
        <div className="container wallet-card">
          <Card className="card-transaction">
            <CardTitle>TRANSACTION DETAIL</CardTitle>
            { this.props.transaction ?
              <div>
                <CardText><strong>Hash: </strong>{this.props.transaction.hash}</CardText>
                <div className="card-table transaction-details">
                  <Table>
                    <thead>
                      <tr>
                        <th>Reference Output</th>
                        <th className="text-right">Output Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.transaction.inputs.map((e, i) => (
                        <tr key={i}>
                          <td>{e.outputHash}</td>
                          <td className="text-right">{e.outputIndex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <br/>
                  <Table>
                    <thead>
                      <tr>
                        <th>Receiver's Address</th>
                        <th className="text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.transaction.outputs.map((e,i) => (
                        <tr key={i}>
                          <td>{e.to}</td>
                          <td className="text-right">{e.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              : null
            }
          </Card>
        </div>
        <Footer/>
      </div>
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
