import React, { Component } from 'react';
import { Redirect, Route as BaseRoute } from 'react-router';

export class Route extends Component {

  render () {
    const { layout: Layout, layoutProps, component: Component, render, ...rest } = this.props;

    const newRender = (props) => {
      const rendered = render ? render(props) : (
        <Component {...props}/>
      );

      if (rendered && rendered.type !== Redirect && Layout) {
        return (
          <Layout {...layoutProps}>
            {rendered}
          </Layout>
        );
      }

      return rendered;
    };

    return <BaseRoute {...rest} render={newRender}/>;
  }
}
