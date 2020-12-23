import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { SelectField } from './SelectField';

export class DictionarySelectField extends Component {
  static propTypes = {
    requestObject: PropTypes.instanceOf(Immutable.Map),
    valueParser: PropTypes.func,
    nameRenderer: PropTypes.func,
    ...SelectField.propTypes
  };

  static defaultProps = {
    valueParser: (record) => parseInt(record.get('id'), 10),
    nameRenderer: (record) => record.get('name')
  };

  renderRecords() {
    const { requestObject, valueParser, nameRenderer } = this.props;
    const records = requestObject.get('records');

    return records.map((record, key) => (
      <option key={key} value={valueParser(record)}>{nameRenderer(record)}</option>
    ));
  }

  render () {
    const {
      loading,
      disabled,
      requestObject,
      valueParser,
      nameRenderer,
      ...rest
    } = this.props;

    return (
      <SelectField
        loading={!requestObject || requestObject.get('loading') || loading}
        disabled={!requestObject || requestObject.get('loading') || disabled}
        {...rest}>
        { requestObject && this.renderRecords() }
      </SelectField>
    );
  }
}