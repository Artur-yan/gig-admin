import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown, NavbarToggler
} from 'reactstrap';

export class HeaderDropdown extends Component {
  static propType = {
    user: PropTypes.instanceOf(Immutable.Map),
    logout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropAccnt() {
    const { logout, user } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <Dropdown nav isOpen={dropdownOpen} toggle={::this.toggle}>
        <DropdownToggle nav>
          <span className='text-center'>{user.get('email')}</span>
          <NavbarToggler className='d-md-down-none'>
            <span className='navbar-toggler-icon'/>
          </NavbarToggler>
        </DropdownToggle>
        <DropdownMenu right>
          {/*<DropdownItem header tag='div' className='text-center'><strong>Account</strong></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-bell-o'></i> Updates<Badge color='info'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-envelope-o'></i> Messages<Badge color='success'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-tasks'></i> Tasks<Badge color='danger'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-comments'></i> Comments<Badge color='warning'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem header tag='div' className='text-center'><strong>Settings</strong></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-user'></i> Profile</DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-wrench'></i> Settings</DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-usd'></i> Payments<Badge color='secondary'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem><i className='fa fa-file'></i> Projects<Badge color='primary'>42</Badge></DropdownItem>*/}
          {/*<DropdownItem divider/>*/}
          {/*<DropdownItem><i className='fa fa-shield'></i> Lock Account</DropdownItem>*/}
          <DropdownItem onClick={() => logout()}><i className='fa fa-lock'/> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    return (
      this.dropAccnt()
    );
  }
}
