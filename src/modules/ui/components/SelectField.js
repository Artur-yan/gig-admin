import React, { Component } from 'react';
import { TextField } from './TextField';

export class SelectField extends Component {
  static propTypes = {
    ...TextField.propTypes
  };

  render () {
    const {
      type,
      placeholder,
      children,
      loading,
      ...rest
    } = this.props;

    return (

      <TextField type='select' {...rest}>
        <option value='' disabled hidden>{loading ? 'Loading...' : placeholder}</option>
        {children}
      </TextField>
    );
  }
}