import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import { selectUser } from '../../auth/redux/selectors';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MainLayout from '../layouts/MainLayout';

@connect(
  (state) => ({
    user: selectUser(state)
  }),
  {
    push
  }
)
export default class NoMatchPage extends Component {
  renderContent() {
    return (
      <CardGroup>
        <Card className='p-4'>
          <CardBody>
            <h1>404</h1>
            <h5>Page not found.</h5>
          </CardBody>
        </Card>
      </CardGroup>
    );
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <MainLayout>
          {this.renderContent()}
        </MainLayout>
      );
    }

    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='4'>
              {this.renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}