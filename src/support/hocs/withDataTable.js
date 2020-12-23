import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { buildSortersQuery, debounce } from '../helpers/utilities';
import { withFormHandler } from './withFormHandler';

@withFormHandler
export function withDataTable(WrappedComponent) {

  return class extends Component {
    static propTypes = {
      getRecordsRequest: PropTypes.instanceOf(Immutable.Map).isRequired,
      getRecords: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.props.setForms({
        showFilters: false,
        sorters: {},
        filters: {},
        pagination: {
          current: 1,
          totalPages: 1,
          perPage: 10
        }
      });
    }

    componentWillReceiveProps(nextProps) {
      const { pagination } = this.props.forms;
      const nextPagination = nextProps.getRecordsRequest.get('pagination');
      if (!nextPagination.equals(pagination)) {
        nextProps.rawInputChangeHandler('pagination', nextPagination);
      }
    }

    getRecords () {
      const { filters, sorters, pagination } = this.props.forms;
      const { current, perPage } = pagination;

      this.props.getRecords({
        orderBy: buildSortersQuery(sorters.toJS()),
        filter: filters.toJS(),
        page: current,
        perPage
      });
    }

    /**
     *
     * @param name
     * @param dir
     * @private
     */
    sort(name, dir) {
      this.props.rawInputChangeHandler('sorters.' + name, dir, undefined, ::this.getRecords);
    }

    /**
     *
     * @param name
     * @param dir
     * @private
     */
    hardSort(name, dir) {
      const { forms, setForms } = this.props;
      setForms({
        ...forms.toJS(),
        sorters: {
          [name]: dir
        },
      }, ::this.getRecords);
    }

    /**
     * @param event
     * @private
     */
    filterEvent(event) {
      this.props.inputChangeHandler(event, undefined, debounce(::this.getRecords, 1000), 'filters');
    }

    /**
     *
     * @param name
     * @param value
     * @private
     */
    filter(name, value) {
      this.props.rawInputChangeHandler('filters.' + name, value, undefined, debounce(::this.getRecords, 1000));
    }

    /**
     *
     * @param page
     * @param resetFilters
     * @param resetSorters
     * @private
     */
    goToPage(page, resetFilters = false, resetSorters = false) {
      const { forms, setForms, rawInputChangeHandler } = this.props;

      if (resetFilters || resetSorters) {
        setForms({
          ...forms.toJS(),
          sorters: resetSorters ? {} : forms.get('sorters').toJS(),
          filters: resetFilters ? {} : forms.get('filters').toJS(),
        }, () => {
          rawInputChangeHandler('pagination.current', page, undefined, ::this.getRecords);
        });
      } else {
        rawInputChangeHandler('pagination.current', page, undefined, ::this.getRecords);
      }
    }

    /**
     *
     * @param perPage
     * @private
     */
    changePerPage(perPage) {
      this.props.rawInputChangeHandler('pagination.perPage', perPage, undefined, ::this.getRecords);
    }

    /**
     *
     * @private
     */
    toggleFilters() {
      const { forms, rawInputChangeHandler } = this.props;
      rawInputChangeHandler('showFilters', !forms.get('showFilters'));
    }

    /**
     *
     * @private
     */
    resetFilters() {
      const { forms, setForms } = this.props;
      setForms({
        ...forms.toJS(),
        filters: {}
      }, ::this.getRecords);
    }

    /**
     *
     * @param renderer
     * @returns {*}
     * @private
     */
    renderRecords (renderer) {
      const { getRecordsRequest } = this.props;
      const { loading, records } = getRecordsRequest;

      if (loading) {
        return (
          <tr>
            <td colSpan={99}>
              <h2>Loading...</h2>
            </td>
          </tr>
        );
      }

      if (records.size === 0) {
        return (
          <tr>
            <td colSpan={99}>
              No records found
            </td>
          </tr>
        )
      }

      return records.map(renderer);
    }

    render () {
      if (this.props.forms.size === 0) {
        return null;
      }

      const { sorters, filters, pagination, showFilters } = this.props.forms;
      const { current, perPage, totalPages, onPage, total } = pagination;

      return (
        <WrappedComponent
          {...this.props}
          sort={::this.sort}
          hardSort={::this.hardSort}
          filter={::this.filter}
          filterEvent={::this.filterEvent}
          goToPage={::this.goToPage}
          changePerPage={::this.changePerPage}
          toggleFilters={::this.toggleFilters}
          resetFilters={::this.resetFilters}
          renderRecords={::this.renderRecords}
          getRecords={::this.getRecords}
          showFilters={showFilters}
          page={current}
          perPage={perPage}
          totalPages={totalPages}
          totalRecords={total}
          recordsOnPage={onPage}
          sorters={sorters}
          filters={filters}/>
      );
    }
  }
}