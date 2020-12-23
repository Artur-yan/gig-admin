import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { randomId } from '../../../support/helpers/utilities';

export class Grid extends Component {
  static propTypes = {
    columns: PropTypes.number,
    padding: PropTypes.number,
    items: PropTypes.oneOfType([
      PropTypes.instanceOf(Immutable.List),
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  static defaultProps = {
    columns: 4,
    padding: 4,
    items: Immutable.List()
  };

  render() {
    const { items, padding, columns: columnNumber } = this.props;

    if (!items) {
      return null;
    }

    const columnWidth = 100 / columnNumber; //calc each column width
    const columnStyles = {
      flex: `${columnWidth}%`,
      maxWidth: `${columnWidth}%`,
      padding: `0 ${padding}px`
    };

    let columns = Array.apply(null, Array(columnNumber));
    columns = columns.map((el, column) =>
      <div className='column' key={randomId()} style={columnStyles}>
        {items.filter((item, key) => key%columnNumber === column)}
      </div>
    );

    return (
      <div className='grid'>
        {columns}
      </div>
    );
  }
}