import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { TextField } from './TextField';

export class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
  };

  static defaultProps = {
    value: null,
    placeholder: '',
    label: '',
  };

  handleChange (date) {
    const { name, onChange } = this.props;

    if(date === null) {
      onChange(name, null);
      return;
    }
    onChange(name, date.format('YYYY-MM-DD') + 'T00:00:00+00:00');
  }

  render () {
    const {
      value,
      name,
      placeholder,
      label
    } = this.props;

    return (
      <ReactDatePicker
        selected={value ? moment(value, 'YYYY-MM-DD') : undefined}
        name={name}
        placeholderText={placeholder}
        onChange={::this.handleChange}
        customInput={
          <TextField
            label={label}
            name={name}/>
        }/>
    );
  }
}