import * as React from 'react';
import { Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { TransactionInfo } from '../../containers';
import { SortSenderAsc, SortSenderDesc,
         SortValueAsc, SortValueDesc,
         SortReceiverAsc, SortReceiverDesc,
         SortHashAsc, SortHashDesc } from '../../helpers/sort';

export interface TransactionsTableProps {
  transactions: Array<TransactionInfo>,
  page: number
}

interface TransactionsTableState {
  transactions: Array<TransactionInfo>,
  page: number,
  sortType: string,
  isValueDesc: boolean,
  isSenderDesc: boolean,
  isReceiverDesc: boolean,
  isHashDesc: boolean,
}

export class TransactionsTable extends React.Component< TransactionsTableProps ,TransactionsTableState> {
  constructor(props: TransactionsTableProps) {
    super(props);
    this.state = {
      transactions: props.transactions,
      page: props.page,
      sortType: "",
      isValueDesc: false,
      isSenderDesc: false,
      isReceiverDesc: false,
      isHashDesc: false,
    };
    this.sortValue = this.sortValue.bind(this)
    this.sortSender = this.sortSender.bind(this)
    this.sortReceiver = this.sortReceiver.bind(this)
    this.sortHash = this.sortHash.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps)
      this.setState(nextProps);
  }

  sortValue(){
    let newData, sorter;
    if(this.state.isValueDesc) {
      sorter = new SortValueAsc(this.state.transactions);
    } else {
      sorter = new SortValueDesc(this.state.transactions);
    }

    newData = sorter.sort();
    this.setState({
      transactions: newData,
      sortType: "value",
      isValueDesc: !this.state.isValueDesc
    })
  }

  sortSender() {
    let newData, sorter;
    if(this.state.isSenderDesc) {
      sorter = new SortSenderAsc(this.state.transactions);
    } else {
      sorter = new SortSenderDesc(this.state.transactions);
    }

    newData = sorter.sort();
    this.setState({
      transactions: newData,
      sortType: "sender",
      isSenderDesc: !this.state.isSenderDesc
    })
  }

  sortReceiver() {
    let newData, sorter;
    if(this.state.isReceiverDesc) {
      sorter = new SortReceiverAsc(this.state.transactions);
    } else {
      sorter = new SortReceiverDesc(this.state.transactions);
    }

    newData = sorter.sort();
    this.setState({
      transactions: newData,
      sortType: "receiver",
      isReceiverDesc: !this.state.isReceiverDesc
    })
  }

  sortHash() {
    let newData, sorter;
    if(this.state.isReceiverDesc) {
      sorter = new SortHashAsc(this.state.transactions);
    } else {
      sorter = new SortHashDesc(this.state.transactions);
    }

    newData = sorter.sort();
    this.setState({
      transactions: newData,
      sortType: "hash",
      isHashDesc: !this.state.isHashDesc
    })
  }

  
  shouldComponentUpdate(nextProps , nextState) {
    if (nextProps.transactions.length > 0 && nextProps.transactions[0].hash){
      return true;
    }
    return false;
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-3" onClick={this.sortHash}>
              Hash
              {
                this.state.sortType == "hash" ?
                <span className="sort-icon">
                  { 
                    this.state.isHashDesc ?  
                    <i className="fa fa-sort-down"></i> :
                    <i className="fa fa-sort-up"></i>
                  }
                </span> 
                : null
              }
            </th>
            <th className="col-3" onClick={this.sortSender}>
              Sender
              {
                this.state.sortType == "sender" ?
                <span className="sort-icon">
                  { 
                    this.state.isSenderDesc ?  
                    <i className="fa fa-sort-down"></i> :
                    <i className="fa fa-sort-up"></i>
                  }
                </span> 
                : null
              }
            </th>
            <th className="col-3" onClick={this.sortReceiver}>
              Reciever
              {
                this.state.sortType == "receiver" ?
                <span className="sort-icon">
                  { 
                    this.state.isReceiverDesc ?  
                    <i className="fa fa-sort-down"></i> :
                    <i className="fa fa-sort-up"></i>
                  }
                </span> 
                : null
              }
            </th>
            <th className="col-2" onClick={this.sortValue}>
              Amount 
              {
                this.state.sortType == "value" ?
                <span className="sort-icon">
                  { 
                    this.state.isValueDesc ?  
                    <i className="fa fa-sort-down"></i> :
                    <i className="fa fa-sort-up"></i>
                  }
                </span> 
                : null
              }
            </th>
          </tr>
        </thead>
        <tbody>
        { this.state.transactions.length > 0 && this.state.transactions[0].hash ?
          this.state.transactions.map((e, i) => (
            <tr key={i}>
              <th scope="row" className="col-1">{10*(this.props.page-1) + i + 1}</th>
              <td className="col-3"><Link to={"/transactions/" + e.hash}>{e.hash.slice(0, 20)}...</Link></td>
              <td className="col-3">{e.sender.slice(0, 20)}...</td>
              <td className="col-3">{e.receiver.slice(0, 20)}...</td>
              <td className="col-2">{e.value}</td>
              </tr>
            ))
          : <div style={{marginTop: "50px"}} className="d-flex justify-content-center">
            <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
          </div>
        }
        </tbody>
      </Table>
    )
  }
}
