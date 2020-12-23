import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Sidebar from '../containers/Sidebar';
import Breadcrumb from '../containers/Breadcrumb';
import { Container } from 'reactstrap';

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    sidebar: PropTypes.bool
  };

  static defaultProps = {
    sidebar: true
  };

  render () {
    const { children, sidebar } = this.props;

    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          {sidebar && (
            <Sidebar {...this.props}/>
          )}
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              {children}
            </Container>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default MainLayout;