import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Navbar className="nav-header" expand="md">
            <Link to="/" className="banner navbar-brand">BLOCKCHAIN</Link>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <div onClick={ () => localStorage.removeItem('user') }>
                  <Link to="/users/sign_in" >Logout</Link>
                </div>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
