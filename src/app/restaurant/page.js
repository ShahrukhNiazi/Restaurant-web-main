'use client'

import React from 'react'
import { useState } from 'react';
import RestaurantLogin from '../__components/RestaurantLogin';
import RestaurantSignin from '../__components/RestaurantSignin';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../__components/RestaurantHeader'
import Footer from '../__components/Footer';

const restaurant = () => {

  const [Login, setLogin] = useState(true);

  return (
    <>
      <Header />
      <Container>
        <Row className='align-items-center justify-content-center height-vh'>
          <Col className='col-lg-6'>
            <h1 className='mt-5 mb-5'>Restarant Signin / Login</h1>
            {
              Login ? <RestaurantLogin /> : <RestaurantSignin />
            }
            <br />
            <button onClick={() => setLogin(!Login)} className='btn btn-primary mt-3'>
              {Login ? "Do not have account ? Signup" : "Already have and account ? login"}
            </button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default restaurant;
