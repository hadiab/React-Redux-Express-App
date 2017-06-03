import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class Menu extends React.Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">React-Bootstrap</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contact">Contact</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="/admin">Admin</NavItem>
            <NavItem eventKey={4} href="/cart">
              <span style={{ marginRight: '5px' }}>Cart</span>  
              { 
                this.props.cartItemsNumber ?
                <Badge>{ this.props.cartItemsNumber }</Badge> : null
              }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
