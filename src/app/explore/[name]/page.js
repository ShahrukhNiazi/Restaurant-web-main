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
      <div className='pt-5 pb-5'>
        <Container>
          <Row>
            <Col className='detail-listing'>
              <h2 className='mb-5 text-center'>Resturants Details</h2>
              <ul className='list-inline m-auto text-center'>
              <li className='rounded'><h3>{RestaurantDetails?.email}</h3></li>
                <li className='rounded'><h3>{RestaurantDetails?.city}</h3></li>
                <li className='rounded'><h3>{RestaurantDetails?.address}</h3></li>
                 <li className='rounded'><h3>{RestaurantDetails?.cntnum}</h3></li>
              </ul>
            </Col>
          </Row>
          <Row>
           

            <Col>
              <table border="1" className='table mt-5 mb-5'>
                <thead>
                  <tr>
                   <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                   </tr>
                </thead>
                <tbody>
                   {foodItems && foodItems.length > 0 ? ( // Check if foodItems is available and not empty
                    foodItems.map((item, index) => (
                      <tr key={index}>
                        <td> {item.name}</td>
                        <td> {item.price}</td>
                        <td> {item.description}</td>
                        <td> <img src={item.img_path} alt={item.name} width={80} height={80} /></td>
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
  )
}

export default page
