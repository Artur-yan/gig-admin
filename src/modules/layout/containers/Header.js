import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../auth/redux/actions';
import { selectUser } from '../../auth/redux/selectors';
import { Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { HeaderDropdown } from '../components';

@connect(
  (state) => ({
    user: selectUser(state)
  }),
  {
    logout, push
  }
)
export default class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    const { logout, user, push } = this.props;

    return (
      <header className='app-header navbar'>
        <NavbarToggler className='d-lg-none' onClick={::this.mobileSidebarToggle}>
          <span className='navbar-toggler-icon'/>
        </NavbarToggler>
        <NavbarBrand href='#'/>
        <NavbarToggler className='d-md-down-none' onClick={::this.sidebarToggle}>
          <span className='navbar-toggler-icon'/>
        </NavbarToggler>
        <Nav className='d-md-down-none' navbar>
          <NavItem className='px-3'>
            <NavLink onClick={() => push('/')} href='#'>Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className='ml-auto' navbar>
          {/*<NavItem className='d-md-down-none'>*/}
            {/*<NavLink href='#'><i className='icon-bell'/><Badge pill color='danger'>5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-list'/></NavLink>
          </NavItem>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-location-pin'/></NavLink>
          </NavItem>
          <HeaderDropdown logout={logout} user={user}/>
        </Nav>
      </header>
    );
  }
}
