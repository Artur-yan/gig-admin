import React, { Component } from 'react';
import Viewer from 'react-viewer';

export class SimpleImageViewer extends Component {
  static propTypes = {
    ...Viewer.propTypes
  };

  render () {
    return <Viewer
      {...this.props}
      drag={false}
      rotatable={false}
      scalable={false}
      changeable={false}/>;
  }
}