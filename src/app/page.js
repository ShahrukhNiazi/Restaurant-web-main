'use client'
import styles from "./page.module.css";
import Customerheader from "./__components/CustomerHeader";
import Customerfooter from "./__components/customerfooter";
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";

export default function Home() {

  const [locations, setlocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {

    loadLocations();

    loadRestaurants();

  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/customer/locations");

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try parsing the response as JSON
      let data = await response.json();

      console.log(data, response);

      if (data.success) {

        setlocations(data.result);

      } else {
        console.error('API responded with an error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred while fetching locations:', error.message);
    }
  };

  const loadRestaurants = async (params) => {

    let url = "http://localhost:3000/api/customer";

    if (params?.locations) {
      url = url + "?locations=" + params.locations

    } else if (params?.restaurants) {

      url = url + "?locations=" + params.restaurants

    }


    try {
      let response = await fetch(url);

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try parsing the response as JSON
      let data = await response.json();

      if (data.success) {
        setRestaurants(data.result); // Correctly setting restaurants here
      } else {
        console.error('API responded with an error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred while fetching restaurants:', error.message);
    }
  };


  return (
    <main className={styles.main}>
      <Customerheader />
      <div className="input-wrapper text-center">
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col className='col-lg-12 col-sm-12 col-12'>
              <h1 className="color-white">Food delivery food</h1>
              <div className="d-flex">
                <select className="form-control">
                  {
                    locations.map((item, index) => (
                      <option key={index}>
                        {item}
                      </option>
                    ))
                  }
                </select>
                <input type="text" className="form-control" placeholder="Select place" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="product-container mt-5">
        <Row>
          {
            restaurants.map((item, index) => (
              <Col className='col-lg-4 col-sm-4 col-12'>
                <div className="card text-white bg-dark mb-3 p-3">
                  <div key={index}>
                    <h4 className="card-header bg-white card-title text-dark mb-3">{item.name}</h4>
                    <div className="card-body p-0">
                      <p className="card-title"><span>description</span> : {item.description}</p>
                      <p className="card-title"><span>city</span> : {item.city}</p>
                      <p className="card-title"><span>address</span> : {item.address}</p>
                      <p className="card-title"><span>cntnum</span> : {item.cntnum}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
      <Customerfooter />
    </main>
  );
}
