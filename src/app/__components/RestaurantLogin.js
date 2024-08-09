'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RestaurantLogin = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState({ email: false, pass: false });
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !pass) {
      setError({
        email: !email,
        pass: !pass,
      });
      return;
    } else {
      setError({ email: false, pass: false });
    }

    try {
      console.log('Attempting login with:', email, pass);

      const response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass, login: true }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login successful');

        const result = { ...data.result };
        delete result.pass; // Remove password from stored data

        localStorage.setItem('restaurantUser', JSON.stringify(result));
        router.push('/restaurant/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert(`An error occurred during login: ${error.message}`);
    }
  };

  return (
    <>
      <h3 className="mb-4">Login</h3>
      <Form.Control
        size="lg"
        type="email"
        placeholder="Enter Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isInvalid={error.email}
      />
      {error.email && <div className="inputerror">Please enter a valid email</div>}
      <br />
      <Form.Control
        size="lg"
        type="password"
        placeholder="Enter password"
        value={pass}
        onChange={(e) => setPassword(e.target.value)}
        isInvalid={error.pass}
      />
      {error.pass && <div className="inputerror">Please enter a valid password</div>}
      <br />
      <Button className="btn btn-primary mt-2" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};

export default RestaurantLogin;