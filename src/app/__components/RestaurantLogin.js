import React from 'react'
import { Form, Button } from 'react-bootstrap'; // Ensure react-bootstrap is installed and imported
import { Container } from 'reactstrap';

const RestaurantLogin = () => {
  return (
    <>
        <h3 className='mb-4'>
          Login  
        </h3>
        <Form.Control size="lg" type="text" placeholder="Enter Email address" />
        <br />
        <Form.Control size="lg" type="text" placeholder="Enter password" />
        <br />
         <Button className='btn btn-primary mt-2'> Login </Button>
     </>
  )
}

export default RestaurantLogin;
