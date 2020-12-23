import React, { Component } from 'react';
import {connect} from 'react-redux';
import { documentTitle } from '../../../support/hocs';
import {Row} from "reactstrap";
import {CircularLoader} from "../../ui/components/CircularLoader";
import {selectGetRecordsRequest} from "../redux/selectors";
import {getRecords} from "../redux/actions";

@connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
  }),
  {
    getRecords
  }
)

@documentTitle('Dashboard')
export default class DashboardContainer extends Component {

  componentDidMount() {
    const {getRecords} = this.props;
    getRecords();
  }
  render () {
    const {getRecordsRequest} = this.props;
    const {loading, records} = getRecordsRequest;

    let xml = <div className='dashboard-stat2'>
      <div className='display'>
        <div className="number">
          {loading ? (
            <CircularLoader width={25} height={25}/>
          ):<h3 className='tg-h3'>{records.getIn(['gigs', 'gigs'])}/{records.getIn(['gigs', 'approvedGigs'])}</h3>}
          <small className='tg-small'>Gigs/Approved</small>
        </div>
      </div>
    </div>;
    return (
      <Row>
        <div className="dashboardContainer">
          <div className='row'>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={1}>
              <div className='dashboard-stat2'>
                <div className='display'>
                  <div className="number">
                    {loading ? (
                      <CircularLoader width={25} height={25}/>
                    ) : <h3 className='tg-h3'>{records.get('artists')}</h3>}
                    <small className='tg-small'>Artists</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={2}>
              <div className='dashboard-stat2'>
                <div className='display'>
                  <div className="number">
                    {loading ? (
                      <CircularLoader width={25} height={25}/>
                    ) : <h3 className='tg-h3'>{records.get('venues')}</h3>}
                    <small className='tg-small'>Venues</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={3}>
              {xml}
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={4}>
              <div className='dashboard-stat2'>
                <div className='display'>
                  <div className="number">
                    {loading ? (
                      <CircularLoader width={25} height={25}/>
                    ) : <h3 className='tg-h3'>{records.get('musicLovers')}</h3>}
                    <small className='tg-small'>MUSIC LOVERS</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}
