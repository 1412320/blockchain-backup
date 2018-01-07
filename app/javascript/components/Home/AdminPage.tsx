import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { adminActions } from '../../actions';
import {UserTable} from './index'
import { TransactionInfo } from '../../containers';
import { TransactionsTable } from './TransactionsTable';
import { PendingsTable } from './PendingsTable'
interface UserInfo {
  email: string,
  address: string,
  available_amount: string,
  real_amount: string,

}
interface AdminPageProps {
  users: Array<UserInfo>,
  system_real_amount: number,
  system_available_amount:number,
  user_count: number,
  getUserPage(number): void,
  handleAdminPending(): void,
  handleAdminConfirmed():void,
  getTransactionsPage(number, boolean): void,
  is_pending: boolean,
  is_confirmed: boolean,
  transactions: Array<TransactionInfo>,
  transactions_count: number 
}

interface AdminPageState {
  activeTab: string,
  users: Array<UserInfo>,
  activePage: number,
  transactions: Array<TransactionInfo>,
  activeTransPage: number   
}
export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
  constructor(props: AdminPageProps) {
    super(props);
    this.state = {
      activeTab: '1',
      users: this.props.users,
      activePage: 1,
      activeTransPage: 1,
      transactions: this.props.transactions
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  initPageNumbers(total){
    let total_rows = total;
    let page = 1;
    let rows = [];
    for(var x = 0; x < total_rows; x += 10){
      rows.push(page);
      page++;
    }
    return rows;
    }
  getUserPage(r){
    if ((r >0) && (r <= this.initPageNumbers(this.props.user_count).length)){
      this.props.getUserPage(r);
      console.log(r)    
      this.setState({
        users: this.props.users,
        activePage: r
      })
    } 
  }
  getTransactionPage(r, type){
    if ((r >0) && (r <= this.initPageNumbers(this.props.transactions_count).length)){
      this.props.getTransactionsPage(r, type);
      console.log(r)    
      this.setState({
        transactions: this.props.transactions,
        activeTransPage: r
      })
    } 
  }
  handleAdminConfirmed()
  {
    this.props.handleAdminConfirmed();
    this.setState({
      activeTransPage: 1
    })
  }
  handleAdminPending(){
    this.props.handleAdminPending();
    this.setState({
      activeTransPage: 1
    })
  }
  render() {
    let rows = this.initPageNumbers(this.props.user_count);
    let rows_transaction = this.initPageNumbers(this.props.transactions_count);    
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              SYSTEM INFO
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              ALL USERS INFO
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              ALL TRANSACTIONS INFO
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12" md="4">
                <div className="wallet-card">
                  <Card className="card-balance">
                    <CardTitle>ALL USERS COUNT</CardTitle>
                    <hr/>
                    <CardText>{this.props.user_count}</CardText>
                  </Card>
                </div>
               </Col> 
              <Col sm="12" md="4">
                <div className="wallet-card">
                  <Card className="card-balance">
                    <CardTitle>SYSTEM REAL BALANCE</CardTitle>
                    <hr/>
                    <CardText>{this.props.system_real_amount}</CardText>
                  </Card>
                </div>
              </Col>
              <Col sm="12" md="4">
                <div className="wallet-card">
                  <Card className="card-balance">
                    <CardTitle>SYSTEM AVAILABLE AMOUNT</CardTitle>
                    <hr/>
                    <CardText>{this.props.system_available_amount}</CardText>
                  </Card>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            {this.props.users ? 
            <UserTable users={this.state.users ? this.props.users : this.state.users}/> : <UserTable users={new Array<UserInfo>()}/>}
            <div className="d-flex justify-content-center pagination">
              <a onClick={() => this.getUserPage(this.state.activePage - 1)} >&laquo;</a>
              {rows.map((r) =>
                  <a onClick={() => this.getUserPage(r)} className={this.state.activePage == r ? "active" : ""}>{r}</a>
              )}
              <a  onClick={() => this.getUserPage(this.state.activePage + 1)}>&raquo;</a>
            </div>
          </TabPane>
          <TabPane tabId="3">
          <div className="wallet-card">
            <Card className="card-transcription">
              <Row>
                <Col lg="6" sm="12">
                  <CardTitle>
                    {`${this.props.is_pending? 'PENDING ' : ''}`}
                    {`${this.props.is_confirmed? 'CONFIRMED ' : ''}`}
                    TRANSACTIONS
                  </CardTitle>
                </Col>
                <Col lg="6" sm="4" className="d-flex justify-content-end">
                  <Button disabled={!!this.props.is_confirmed} className="btn-newest" onClick={this.handleAdminConfirmed.bind(this)}>Confirmed</Button>
                  <Button disabled={!!this.props.is_pending} className="btn-pending" onClick={this.handleAdminPending.bind(this)}>Pending</Button>
                </Col>
              </Row>
              <div className="transactions-card">
                {
                  !this.props.is_pending?
                  <TransactionsTable page={this.state.activeTransPage} transactions={this.props.transactions ? this.props.transactions : new Array<TransactionInfo>()}/> :
                  <PendingsTable transactions={this.props.transactions ? this.props.transactions : new Array<TransactionInfo>()}
                                 handleConfirm={null} handleDelete={null}/>
                }
              </div>
            </Card>
            <div className="d-flex justify-content-center pagination">
              <a onClick={() => this.getTransactionPage(this.state.activeTransPage - 1, this.props.is_confirmed)} >&laquo;</a>
              {rows_transaction.map((r) =>
                  <a onClick={() => this.getTransactionPage(r, this.props.is_confirmed)} className={this.state.activeTransPage == r ? "active" : ""}>{r}</a>
              )}
              <a  onClick={() => this.getTransactionPage(this.state.activeTransPage + 1, this.props.is_confirmed)}>&raquo;</a>
            </div>
          </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
