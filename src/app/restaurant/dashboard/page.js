'use client';

import RestaurantHeader from '@/app/__components/RestaurantHeader';
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantFooter from '@/app/__components/Footer';
 

const Dashboard = () => {

  return (
    <>
      <RestaurantHeader />
        <Container>
          <Row className='align-items-center justify-content-center'>
            <Col className='col-lg-6'>
              <h1 className='mt-5 mb-5'>Dashboard </h1>
            </Col>
          </Row>
        </Container>
      <RestaurantFooter/>
    </>
  )
}

export default Dashboard;
