import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Navbar className="nav-header" expand="md">
          <NavbarBrand className="banner">BLOCKCHAIN</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/users/sign_in">Logout</Link>
              </NavItem>
            </Nav>
        </Navbar>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
