"use client"

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const page = (props) => {

  const name = props.params.name
  console.log("searchprops" + props)

  const [RestaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setfoodItems] = useState();

  useEffect(() => {

    loadRestaurantsDetails();

  }, []);


  const loadRestaurantsDetails = async () => {

    const id = props.searchParams.id
    console.log("shahrukh data" + id);
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();

    if (response.success) {
      setRestaurantDetails(response.details)
      setfoodItems(response.foodItems)
    }

  }

  return (
    <>
      <div className='input-wrapper'>
        <Container>
          <Row className='col-lg-12 col-sm-12 col-12'>
            <Col className='text-center'>
              <h1 className='color-white'>{decodeURI(name)}</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              <ul>
                <li><h3>{RestaurantDetails?.contact}</h3></li>
                <li><h3>{RestaurantDetails?.city}</h3></li>
                <li><h3>{RestaurantDetails?.address}</h3></li>
                <li><h3>{RestaurantDetails?.email}</h3></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              {foodItems && foodItems.length > 0 ? ( // Check if foodItems is available and not empty
                foodItems.map((item, index) => (
                  <div key={index}>
                    {item.name}
                    {item.price}
                    {item.description}
                  </div>

                ))
              ) : (
                <p>No food items available</p> // Fallback message if there are no food items
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default page
