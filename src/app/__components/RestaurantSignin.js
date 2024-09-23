 'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Container } from 'reactstrap';

const RestaurantSignin = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cntnum, setCntNum] = useState('');
  const router = useRouter(); 
  const [error,setError]=useState(false);
  const [passwordError,SetpasswordError]=useState(false)

  const handleSignup = async () => {
 
    if(pass!==confirmPass){
        SetpasswordError(true);
        return false
    }else{
        SetpasswordError(false)
    }
    
    if(!email || !name  || !pass || !city || !address || !cntnum){
        setError(true);
        return false
    }else{
        setError(false)
    }
  
    console.log(email, name ,pass, city, address, cntnum);
    try {
      let response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, pass, city, address, cntnum })
      });

      response = await response.json();
 
      if (response.success) {
        const { result } = response;
        delete result.pass;
       
        responecheck = localStorage.setItem("restaurantUser", JSON.stringify(result));
        console.log(responecheck);
        router.push("/restaurant");
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h3 className='mb-4'>Signin</h3>
      <Form.Control size="lg" type="email" placeholder="Enter Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
        {
          error && !email && <div className='inputerror'> Incorrect Email </div>
        }
      <br />
      <Form.Control size="lg" type="Name" placeholder="Enter Name" value={name} onChange={(event) => setName(event.target.value)} />
        {
          error && !name && <div className='inputerror'> Incorrect name </div>
        }
      <br />
      <Form.Control size="lg" type="password" placeholder="Enter password" value={pass} onChange={(event) => setPass(event.target.value)} />
        {
          passwordError && <div className='inputerror'> Password and Conform password not match </div>
        }
        {
          error && !pass && <div className='inputerror'> Incorrect Email </div>
        }
      <br />
      <Form.Control size="lg" type="password" placeholder="Confirm password" value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} />
        {
          passwordError && <div className='inputerror'> Password and Conform password not match </div>
        }
        {
          error && !confirmPass && <div className='inputerror'> Incorrect Email </div>
        }
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter City" value={city} onChange={(event) => setCity(event.target.value)} />
        {
          error && !city && <div className='inputerror'> Incorrect city </div>
        }
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter full Address" value={address} onChange={(event) => setAddress(event.target.value)} />
        {
          error && !address && <div className='inputerror'> Incorrect address </div>
        }
      <br />
      <Form.Control size="lg" type="text" placeholder="Enter contact number" value={cntnum} onChange={(event) => setCntNum(event.target.value)} />
        {
          error && !cntnum && <div className='inputerror'> Incorrect Number </div>
        }
      <br />
      <Button className='btn btn-primary mt-2' onClick={handleSignup}>Signin</Button>
    </Container>
  );
};

export default RestaurantSignin;