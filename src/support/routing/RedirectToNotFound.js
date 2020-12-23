import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';

@withRouter
export class RedirectToNotFound extends Component {
  render () {
    const { location } = this.props;

    return (
      <Redirect to={{
        ...location,
        state: {
          ...location.state,
          notFoundError: true
        }
      }}/>
    );
  }
}