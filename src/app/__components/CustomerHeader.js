'use client';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';


const CustomerHeader = (props) => {
    const { cartData } = props;
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    const [cartNumber, setCartNumber] = useState(cartStorage?.length);
    const [cartItem, setCartItem] = useState(cartStorage);



    useEffect(() => {
        console.log(props);
        if (props.cartData) {
            if (cartNumber) {
                let localCartItems=cartItem;
                localCartItems.push(JSON.parse(JSON.stringify(props.cartData)))
                setCartItem(localCartItems);
                setCartNumber(cartNumber+1)
                localStorage.setItem('cart', JSON.stringify(localCartItems))
                  
            } else {

              setCartNumber(1)
              setCartItem([props.cartData])
              localStorage.CartItems.setItem('cart',JSON.stringify(localCartItems))
              localStorage.setItem('cart',JSON.stringify([props.cartData]))

            }
        }
        
    }, [props.cartData])

 
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="http://localhost:3000/">
                        <img src="https://lh3.googleusercontent.com/p7iSxrJmbbtowqzEuu6V0Fb60-DvTXw1HspVfQXyo8IGPo_Umd5f6-xhDfz31i3rZA" width={100} height={100} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <ul className='p-0'>
                                <li>
                                    <Nav.Link href="#">Home</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">Login</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">Sign up</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="#">cart({cartNumber?cartNumber:0})</Nav.Link>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}

export default CustomerHeader;