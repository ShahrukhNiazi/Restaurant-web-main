import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Ensure react-bootstrap is installed and imported

const RestaurantLogin = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !pass) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    
    try {
      console.log('email, password, login: true',email, pass);

      const response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass, login: true })
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login', error);
    }
  };

  return (
    <>
      <h3 className='mb-4'>Login</h3>
      <Form.Control
        size="lg"
        type="email"
        placeholder="Enter Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && !email && <div className='inputerror'>Please enter a valid email</div>}
      <br />
      <Form.Control
        size="lg"
        type="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && !pass && <div className='inputerror'>Please enter a valid password</div>}
      <br />
      <Button className='btn btn-primary mt-2' onClick={handleLogin}>Login</Button>
    </>
  );
};

export default RestaurantLogin;