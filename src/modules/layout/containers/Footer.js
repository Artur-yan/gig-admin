/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    // const year = (new Date()).getFullYear();
    // const copyright = `Copyright © ${year} Printhum All rights reserved.`;
    return (
      <footer className='app-footer justify-content-center'>
        <span>All Rights reserved "TONIGHT'S GIGS" 2018 ©</span>
      </footer>
    )
  }
}
