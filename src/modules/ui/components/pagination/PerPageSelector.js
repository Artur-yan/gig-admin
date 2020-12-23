import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectField } from '../SelectField';

export class PerPageSelector extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {

    const { current, onSelect, ...rest } = this.props;

    return (
      <div style={{ width: 80 }}>
        <SelectField
          label='Per Page'
          placeholder='Per Page'
          name='perPage'
          value={current}
          onChange={(e) => { onSelect(e.target.value) }}
          {...rest}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </SelectField>
      </div>
    );
  }
}