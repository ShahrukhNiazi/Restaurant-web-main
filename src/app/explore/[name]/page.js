"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomerHeader from '../../__components/CustomerHeader';

const Page = (props) => {
  const name = props.params.name;

  const [RestaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState(); // This will store the item in the cart

  useEffect(() => {
    loadRestaurantsDetails();
  }, []);

    const loadRestaurantsDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    setCartData(item); // Store the entire item, not just item.name
    console.log("Item added to cart:", item); // This will log the entire item object
  };

  return (
    <>
      <CustomerHeader cartData={cartData} /> {/* Pass cartData as prop */}
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
                          <Button className="btn btn-primary" onClick={() => addToCart(item)}>
                            Add to cart
                          </Button>
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
