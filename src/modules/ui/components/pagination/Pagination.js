import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination as ReactStrapPagination, PaginationItem, PaginationLink
} from 'reactstrap';

export class Pagination extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func.isRequired,
    dockLength: PropTypes.number
  };

  static defaultProps = {
    dockLength: 3
  };

  render() {

    const { current, totalPages, onPageSelect, dockLength, ...rest } = this.props;

    const showPrev = current > 1;
    const showNext = current < totalPages;

    let pages = [];
    let i = current > dockLength ? current - dockLength : 1;

    while (i <= totalPages && pages.length < dockLength * 2 + 1) {
      let k = i;
      pages.push(
        <PaginationItem key={i} active={current === i}>
          <PaginationLink onClick={() => onPageSelect(k)}>{i}</PaginationLink>
        </PaginationItem>
      );
      i++;
    }

    return (
      <ReactStrapPagination {...rest}>
        { showPrev &&
        <PaginationItem>
          <PaginationLink onClick={() => onPageSelect(1) }>
            <i className="fa fa-angle-double-left"/>
          </PaginationLink>
        </PaginationItem>}
        { showPrev &&
        <PaginationItem>
          <PaginationLink onClick={() => onPageSelect(current - 1) }>
            <i className="fa fa-angle-left"/>
          </PaginationLink>
        </PaginationItem>}
        { pages }
        { showNext &&
        <PaginationItem>
          <PaginationLink onClick={() => onPageSelect(current + 1) }>
            <i className="fa fa-angle-right"/>
          </PaginationLink>
        </PaginationItem>}
        { showNext &&
        <PaginationItem>
          <PaginationLink onClick={() => onPageSelect(totalPages) }>
            <i className="fa fa-angle-double-right"/>
          </PaginationLink>
        </PaginationItem>}
      </ReactStrapPagination>
    );
  }
}