import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';
import MyBooks from './mybooks.js';
import AllBooks from './allbooks.js';
import AddBooks from './searchbar.js'
export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
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
    return (
      <Container fluid>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All Books
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              My Books
            </NavLink>
          </NavItem>
            <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Add Books 
            </NavLink>
          </NavItem>
        </Nav><br/>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <AllBooks />
          </TabPane>

          <TabPane tabId="2">
            <MyBooks />
          </TabPane>


          <TabPane tabId="3">
            <AddBooks />
          </TabPane>

        </TabContent>
      </Container>
    );
  }
}

