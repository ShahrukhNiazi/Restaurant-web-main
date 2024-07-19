 'use client';

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Container } from 'reactstrap';

const RestaurantSignin = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cntnum, setCntNum] = useState('');

  const handleSignup = async () => {
    console.log(email, pass, city, address, cntnum);
    try {
      let result = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass, city, address, cntnum })
      });

      result = await result.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h3 className='mb-4'>Signin</h3>
      <Form.Control size="lg" type="email" placeholder="Enter Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
      <br />
      <Form.Control size="lg" type="password" placeholder="Enter password" value={pass} onChange={(event) => setPass(event.target.value)} />
      <br />
      <Form.Control size="lg" type="password" placeholder="Confirm password" value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} />
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter City" value={city} onChange={(event) => setCity(event.target.value)} />
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter full Address" value={address} onChange={(event) => setAddress(event.target.value)} />
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter contact number" value={cntnum} onChange={(event) => setCntNum(event.target.value)} />
      <br />
      <Button className='btn btn-primary mt-2' onClick={handleSignup}>Signin</Button>
    </Container>
  );
};

export default RestaurantSignin;