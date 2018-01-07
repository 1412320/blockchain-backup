
import * as React from 'react';
import { Row, Col, Button, Card, CardText, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import axios from 'axios'
interface UserTableProps {
  users: any
}
interface UserTableState {
  users: any
}
export class UserTable extends React.Component<UserTableProps, UserTableState> {
  constructor(props: UserTableProps) {
    super(props);
    this.state = {
      users: this.props.users
    }
  }
  render() {   
    return(
      <Table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Gmail</th>
            <th>Real balance</th>
            <th>Available balance</th>                                           
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((e, i) => ( 
            <tr key={i}>
              <td>{e.address}</td>
              <td>{e.email}</td>
              <td>{e.real_amount}</td>
              <td>{e.available_amount}</td>             
            </tr>
          ))
          }
        </tbody>
      </Table>
    )
  }
}