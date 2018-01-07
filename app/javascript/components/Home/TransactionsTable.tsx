import * as React from 'react';
import { Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { TransactionInfo } from '../../containers';
         
export interface TransactionsTableProps {
  transactions: Array<TransactionInfo>
}

export class TransactionsTable extends React.Component< TransactionsTableProps ,{}> {
  constructor(props: TransactionsTableProps) {
    super(props);
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-3">Hash</th> 
            <th className="col-3">Sender</th>
            <th className="col-3">Reciever</th>
            <th className="col-2">Amount</th>
          </tr>
        </thead>
        <tbody>
        { this.props.transactions.length > 0 ?
          this.props.transactions.map((e, i) => (
            <tr key={i}>
              <th scope="row" className="col-1">{i + 1}</th>
              <td className="col-3">{e.hash.slice(0, 20)}...</td> 
              <td className="col-3">{e.sender.slice(0, 20)}...</td>
              <td className="col-3">{e.receiver.slice(0, 20)}...</td>
              <td className="col-2">{e.value}</td>
              </tr>
            ))
          : null
        }
        </tbody>
      </Table>
    )
  }
}