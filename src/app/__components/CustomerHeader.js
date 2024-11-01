'use client';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';

const CustomerHeader = (props) => {
    const { cartData, removeCartData } = props;

    // Safely parse the localStorage data
    let initialCartStorage = [];
    try {
        initialCartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.warn("Failed to parse cart data from localStorage. Resetting cart.");
        localStorage.removeItem('cart'); // Reset cart if data is invalid
    }

    const [cartNumber, setCartNumber] = useState(initialCartStorage.length);
    const [cartItem, setCartItem] = useState(initialCartStorage);

    useEffect(() => {
        if (cartData) {
            // Check if cart already has items and the restaurant ID matches
            if (cartItem.length > 0 && cartItem[0]?.resto_id !== cartData.resto_id) {
                // Different restaurant ID, so clear the cart and add the new item
                console.log('Cleared cart and added new item from a different restaurant');
                const updatedCart = [cartData];
                setCartItem(updatedCart);
                setCartNumber(updatedCart.length);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } else {
                // Same restaurant or empty cart; add the item to the existing cart
                const updatedCart = [...cartItem, cartData];
                setCartItem(updatedCart);
                setCartNumber(updatedCart.length);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log('Added item to existing cart');
            }
        }
    }, [cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            const updatedCart = cartItem.filter((item) => item._id !== props.removeCartData);
            setCartItem(updatedCart);
            setCartNumber(updatedCart.length);
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Remove the cart from localStorage if it's empty
            if (updatedCart.length === 0) {
                localStorage.removeItem('cart');
            }
            console.log("Item removed from cart:", props.removeCartData);
        }
    }, [props.removeCartData]);


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
                                    <Nav.Link href="#">Cart ({cartNumber || 0})</Nav.Link>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default CustomerHeader;