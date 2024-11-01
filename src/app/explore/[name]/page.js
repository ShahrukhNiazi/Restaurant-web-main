"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomerHeader from '../../__components/CustomerHeader';

const Page = (props) => {
  const name = props.params.name;
  const [RestaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [removeCartData, setRemoveCartData] = useState();
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    // Load cart data from localStorage on the client side
    if (typeof window !== 'undefined') {
      const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartStorage(initialCart);
      setCartIds(initialCart.map((item) => item._id));
    }
  }, []);

  useEffect(() => {
    loadRestaurantsDetails();
  }, []);

  const loadRestaurantsDetails = async () => {
    const id = props.searchParams.id;
    const response = await fetch(`http://localhost:3000/api/customer/${id}`);
    const data = await response.json();
    if (data.success) {
      setRestaurantDetails(data.details);
      setFoodItems(data.foodItems);
    }
  };

  const addToCart = (item) => {
    setCartData(item);

    setCartStorage((prevCartStorage) => {
      const updatedCart = [...prevCartStorage, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    setCartIds((prevCartIds) => [...prevCartIds, item._id]);
    console.log("Item added to cart:", item);
  };

  const removeFromCart = (itemId) => {
    setRemoveCartData(itemId);

    setCartStorage((prevCartStorage) => {
      const updatedCart = prevCartStorage.filter((item) => item._id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      }

      return updatedCart;
    });

    setCartIds((prevCartIds) => prevCartIds.filter((id) => id !== itemId));
    console.log("Item removed from cart:", itemId);
  };

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="input-wrapper">
        <Container>
          <Row className="col-lg-12 col-sm-12 col-12">
            <Col className="text-center">
              <h1 className="color-white"> {decodeURI(name)} </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-5 pb-5">
        <Container>
          <Row>
            <Col className="detail-listing">
              <h2 className="mb-5 text-center">Restaurant Details</h2>
              <ul className="list-inline m-auto text-center">
                <li className="text-capitalize rounded"><h3>{RestaurantDetails?.email}</h3></li>
                <li className="text-capitalize rounded"><h3>{RestaurantDetails?.city}</h3></li>
                <li className="text-capitalize rounded"><h3>{RestaurantDetails?.address}</h3></li>
                <li className="text-capitalize rounded"><h3>{RestaurantDetails?.cntnum}</h3></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <table border="1" className="table mt-5 mb-5">
                <thead>
                  <tr>
                    <th className="text-capitalize">Name</th>
                    <th className="text-capitalize">Price</th>
                    <th className="text-capitalize">Description</th>
                    <th className="text-capitalize">Image</th>
                    <th className="text-capitalize">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foodItems && foodItems.length > 0 ? (
                    foodItems.map((item, index) => (
                      <tr key={index}>
                        <td className="text-capitalize">{item.name}</td>
                        <td className="text-capitalize">{item.price}</td>
                        <td className="text-capitalize">{item.description}</td>
                        <td className="text-capitalize">
                          <img src={item.img_path} alt={item.name} width={80} height={80} />
                        </td>
                        <td>
                          {cartIds.includes(item._id) ? (
                            <Button onClick={() => removeFromCart(item._id)}>Remove From Cart</Button>
                          ) : (
                            <Button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No food items available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Page;
