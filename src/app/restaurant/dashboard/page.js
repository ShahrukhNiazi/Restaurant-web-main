'use client';
import React, { useState } from 'react';
import RestaurantHeader from '@/app/__components/RestaurantHeader';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RestaurantFooter from '@/app/__components/Footer';
import AddFoodiItem from '../../__components/AddFooditem';

const Dashboard = () => {

  const [addItem, setAddItem] = useState(false); // Use a boolean to control the visibility

  return (
    <>
      <RestaurantHeader />
      <Container>
        <Row className='align-items-center justify-content-center'>
          <Col className='col-lg-12'>
            <Button onClick={() => setAddItem(true)} className='mt-4 mr-2'>Add food</Button>
            <Button onClick={() => setAddItem(false)} className='mt-4'>Dashboard</Button>
          </Col>
        </Row>
        <Row className='align-items-center justify-content-center'>
          <Col className='col-lg-12'>
            {
              addItem ? <AddFoodiItem /> : <h1 className='mt-5 mb-5 text-center'> Dashboard </h1>
            }
          </Col>
        </Row>
      </Container>
      <RestaurantFooter />
    </>
  )
}

export default Dashboard;