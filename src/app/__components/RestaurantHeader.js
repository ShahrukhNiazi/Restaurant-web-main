'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';// Use the correct router import
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Row, Col } from 'react-bootstrap';

const RestaurantHeader = () => {
  const router = useRouter(); // useRouter should be called inside the component
  const [details, setDetails] = useState(null); // Initialize state with null

  useEffect(() => {
    // Use try-catch to handle potential errors
    try {
      const data = localStorage.getItem("restaurant"); // Fix the typo here
      if (!data) {
        router.push("/restaurant"); // Ensure the route exists
      } else {
        setDetails(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching restaurant details from localStorage:", error);
    }
  }, [router]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {
              details && details.name?
               <>
                <Nav.Link href="#"> logout </Nav.Link> 
                <Nav.Link href="#"> Profile </Nav.Link> 
                </>
                : <Nav.Link href="#"> Login/Signup </Nav.Link>  
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RestaurantHeader;