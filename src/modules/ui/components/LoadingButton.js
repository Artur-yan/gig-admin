import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { EXPAND_RIGHT, ZOOM_IN, S, } from 'react-ladda';
import classNames from 'classnames/bind';

export class LoadingButton extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    expand: PropTypes.bool,
    color: PropTypes.string
  };

  static defaultProps = {
    loading: false,
    expand: true,
    color: 'primary'
  };

  render () {
    const { color, loading, expand, className, ...rest } = this.props;

    const classes = classNames([
      'btn', `btn-${color}`
    ], className);

    return (
      <LaddaButton
        {...rest}
        className={classes}
        loading={loading}
        data-color="#eee"
        data-size={S}
        data-style={expand ? EXPAND_RIGHT : ZOOM_IN }
        data-spinner-size={30}
        data-spinner-color="#fff"
        data-spinner-lines={12}/>
    );
  }
}