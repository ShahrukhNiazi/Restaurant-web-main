'use client';
import React, { useState } from 'react';
import RestaurantHeader from '@/app/__components/RestaurantHeader';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RestaurantFooter from '@/app/__components/Footer';
import AddFoodiItem from '../../__components/AddFooditem';
import FoodItem from '../../__components/FoodItem';


const Dashboard = (props) => {

  const [addItem, setAddItem] = useState(false); // Use a boolean to control the visibility

  return (
    <>
      <RestaurantHeader />
      <div className='dashboard-main'>
       <Container>
        <Row className='align-items-center justify-content-center'>
          <Col className='col-lg-12'>
            <Button onClick={() => setAddItem(true)} className='mt-4'>Add food</Button>
            <Button onClick={() => setAddItem(false)} className='mt-4 offset-md-1'>Dashboard</Button>
          </Col>
        </Row>
        <Row className='align-items-center justify-content-center 100-vh'>
          <Col className='col-lg-12'>
            {
              addItem ? <AddFoodiItem setAddItem={setAddItem}/> : <FoodItem/>
            }
          </Col>
        </Row>
      </Container>
      </div>
     
      <RestaurantFooter />
    </>
  )
}

export default Dashboard;