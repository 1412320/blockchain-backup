import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { adminActions } from '../../actions';
import {UserTable} from './index'
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
  user_count: number
}

interface AdminPageState {
  activeTab: string,
}
export class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
  constructor(props: AdminPageProps) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    console.log(this.props.users)
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
              <Col sm="12" md="3">
                <div className="wallet-card">
                  <Card className="card-balance">
                    <CardTitle>ALL USERS COUNT</CardTitle>
                    <hr/>
                    <CardText>{this.props.user_count}</CardText>
                  </Card>
                </div>
               </Col> 
              <Col sm="12" md="3">
                <div className="wallet-card">
                  <Card className="card-balance">
                    <CardTitle>SYSTEM REAL BALANCE</CardTitle>
                    <hr/>
                    <CardText>{this.props.system_real_amount}</CardText>
                  </Card>
                </div>
              </Col>
              <Col sm="12" md="3">
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
            <UserTable users={this.props.users}/> : <UserTable users={new Array<UserInfo>()}/>}
          </TabPane>
          <TabPane tabId="3">
          </TabPane>
        </TabContent>
      </div>
    );
  }
}