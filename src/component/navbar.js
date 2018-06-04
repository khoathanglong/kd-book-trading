import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';
import '../style/navbar.css'
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">KD-Books</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/books/">All books</NavLink>
              </NavItem>
	            {this.props.user?
	            	<Nav>
		              	<NavItem>
		                	<NavLink href="/users/books">My Books</NavLink>
		              	</NavItem>
		              	<NavItem>
		                	<NavLink href="/users/books">Log Out</NavLink>
		              	</NavItem>
	              	</Nav>:
	              	<NavItem>
                		<NavLink href="#">Login</NavLink>
              		</NavItem>
	            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
