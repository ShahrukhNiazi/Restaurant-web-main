'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usePathname to get the current pathname
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';

const Customerheader = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="https://lh3.googleusercontent.com/p7iSxrJmbbtowqzEuu6V0Fb60-DvTXw1HspVfQXyo8IGPo_Umd5f6-xhDfz31i3rZA" width={100} height={100}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <ul className='p-0'>
                                <li>
                                    <Nav.Link href="#">Home</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">About us</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">Services</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">About</Nav.Link>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
         </>
    )

}

export default Customerheader;