import React, { Component } from 'react';
import { withRouter } from 'react-router';

@withRouter
export function captureRouteNotFound(notFoundPage) {

  return WrappedComponent => class extends Component {
    previousLocation = this.props.location;

    componentWillReceiveProps(nextProps) {
      const { location } = this.props;
      const { history } = nextProps;

      if (history.action !== 'POP') {
        this.previousLocation = location;
      }
    }

    render () {
      const { location } = this.props;

      if (
        location
        && location.state
        && location.state.notFoundError
        && this.previousLocation !== location
      ) {
        return notFoundPage;
      }

      return <WrappedComponent {...this.props}/>
    }
  }
}