import React, { Component } from 'react';

import '../styles/line-scale-spinner.scss';

export class LineScaleSpinner extends Component {

  render () {
    return (
      <div className='line-scale-spinner'>
        <div className='rect1'/>
        <div className='rect2'/>
        <div className='rect3'/>
        <div className='rect4'/>
        <div className='rect5'/>
      </div>
    );
  }
}