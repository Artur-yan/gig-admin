import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

export class SortableTh extends Component {
  static propTypes = {
    sorters: PropTypes.instanceOf(Immutable.Map).isRequired,
    name: PropTypes.string.isRequired,
    dir: PropTypes.string
  };

  static defaultProps = {
    dir: undefined,
    sorters: []
  };

  render () {
    const { sorters, children, onSort, name, ...rest } = this.props;
    const dir = sorters.get(name);
    const nextDir = dir === 'asc' ? 'desc' : 'asc';

    return (
      <th {...rest} onClick={onSort && (() => { onSort(name, nextDir) })} role='button'>
        <span>
          {children}
        </span>
        {dir ? (
          dir === 'asc' ? <i className='pull-right font-lg fa fa-sort-up'/> : <i className='pull-right font-lg fa fa-sort-down'/>
        ) : (
          <i className='pull-right font-lg fa fa-sort' style={{ opacity: 0.5 }}/>
        )}
      </th>
    );
  }
}