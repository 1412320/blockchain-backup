import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';

interface AdminPageProps {
  dispatch: any,  
  activeTab: string
}

interface AdminPageState {
  activeTab: string
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
  componentWillMount() {
    this.props.dispatch(adminActions.getAllUsersInfo());    
  }  
  render() {
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
          </TabPane>
          <TabPane tabId="2">
          </TabPane>
          <TabPane tabId="3">
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
