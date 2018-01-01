import * as React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Container,
         NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class HomeHeader extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="nav-header" expand="md">
          <NavbarBrand className="banner">BLOCKCHAIN</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/users/sign_out">Logout</NavLink>
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
