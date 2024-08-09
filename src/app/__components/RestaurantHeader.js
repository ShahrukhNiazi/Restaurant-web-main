'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usePathname to get the current pathname
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';

const RestaurantHeader = () => {
  const router = useRouter();
  const pathname = usePathname(); // usePathname to get the current pathname
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Use try-catch to handle potential errors
    try {
      const data = localStorage.getItem("restaurantUser");
      if (!data && pathname === "/restaurant/dashboard") {
        router.push("/restaurant");
      } else if (data && pathname === "/restaurant") {
        router.push("/restaurant/dashboard");
      } else {
        setDetails(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching restaurant details from localStorage:", error);
    }
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem('restaurantUser');
    router.push("/restaurant");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className='p-0'>
              <li>
                <Nav.Link href="#home">Home</Nav.Link>
              </li>
              {details && details.email ? (
                <>
                  <li>
                    <Nav.Link href="#">
                      <Button className="btn btn-primary" onClick={logout}>Logout</Button>
                    </Nav.Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Nav.Link href="#">Login/Signup</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href="#">Profile</Nav.Link>
                  </li>
                </>
              )}
           
            </ul>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RestaurantHeader;
