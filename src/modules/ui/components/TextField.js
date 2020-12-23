import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

export class TextField extends Component {
  static propTypes = {
    // Value
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    // Type
    type: PropTypes.string,
    // Label
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    // Name
    name: PropTypes.string.isRequired,
    // On change function
    onChange: PropTypes.func,
    // Placeholder
    placeholder: PropTypes.string,
    // Errors
    error: PropTypes.string,
    // Addons
    prependAddon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    appendAddon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
  };

  static defaultProps = {
    type: 'text'
  };

  render () {
    const {
      value,
      type,
      label,
      name,
      onChange,
      placeholder,
      error,
      prependAddon,
      appendAddon,
      className,
      ...rest
    } = this.props;

    const classes = classNames(className, {
      'is-invalid': error
    });

    const safeValue = value === null || value === undefined ? '' : value;

    return (
      <FormGroup className='mb-3'>
        {label && <Label htmlFor={name}>{label}</Label>}
        <div className='controls'>
          <InputGroup className='input-prepend'>
            {prependAddon && (
              <InputGroupAddon addonType='prepend'>
                {prependAddon}
              </InputGroupAddon>
            )}
            <Input
              id={name}
              name={name}
              type={type}
              value={safeValue}
              onChange={onChange}
              placeholder={placeholder}
              className={classes}
              {...rest}/>
            {appendAddon && (
              <InputGroupAddon addonType='append'>
                {appendAddon}
              </InputGroupAddon>
            )}
          </InputGroup>
          {error && <p className='help-block'>{error}</p>}
        </div>
      </FormGroup>
    );
  }
}