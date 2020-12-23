import React, { Component } from 'react';
import { SelectField } from './SelectField';
import states from '../data/states';

export class StateSelectField extends Component {

  render () {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <SelectField {...rest}>
        {states.map(({code, name}, key) => (
          <option key={key} value={code}>{name}</option>
        ))}
      </SelectField>
    );
  }
}