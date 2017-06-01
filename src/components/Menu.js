import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class Menu extends React.Component {

  renderBadge(){

  }

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to="/about">About</Link></NavItem>
            <NavItem eventKey={2}><Link to="/contact">Contact</Link></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
            <NavItem eventKey={2} href="/cart">
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
