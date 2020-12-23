import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextField } from './TextField';
import { FormGroup, Input, Label } from 'reactstrap';

export class Checkbox extends Component {
  static propTypes = {
    ...TextField.propTypes,
    checked: PropTypes.bool
  };

  static defaultProps = {
    checked: false
  };

  render () {
    const {
      label,
      name,
      value,
      checked,
      className,
      containerClassName,
      ...rest
    } = this.props;

    const classes = classNames(className, {
      'form-check-input': true
    });

    const containerClasses = classNames(containerClassName, {
      'checkbox': true
    });

    return (
      <FormGroup check className={containerClasses}>
        <Input
          id={name}
          name={name}
          type='checkbox'
          className={classes}
          value={value || ''}
          checked={checked}
          {...rest}/>
        {label && <Label check className='form-check-label' htmlFor={name}>{label}</Label>}
        {!label && <Label check className='form-check-label' htmlFor={name}/>}
      </FormGroup>
    );
  }
}