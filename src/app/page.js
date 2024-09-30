'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Customerheader from "./__components/CustomerHeader";
import Customerfooter from "./__components/customerfooter";
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadRestaurants();
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/customer/locations");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      if (data.success) {
        setLocations(data.result);
      } else {
        console.error('API responded with an error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred while fetching locations:', error.message);
    }
  };

  const loadRestaurants = async (params = {}) => {
    let url = "http://localhost:3000/api/customer";

    if (params.locations) {
      url = `?/locations=`+params.locations;
    } else if (params.restaurants) {
      url = `?/restaurants`+params.restaurants;
    }

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      if (data.success) {
        setRestaurants(data.result);
      } else {
        console.error('API responded with an error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred while fetching restaurants:', error.message);
    }
  };

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue);
    loadRestaurants({ locations: selectedValue });
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    loadRestaurants({ restaurants: searchValue });
  };

  return (
    <main className={styles.main}>
      <Customerheader />
      <div className="input-wrapper text-center">
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col className='col-lg-12 col-sm-12 col-12'>
              <h1 className="color-white">Food delivery</h1>
              <div className="d-flex">
                <select className="form-control" onChange={handleLocationChange}>
                  <option value="">Select Location</option>
                  {locations.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search restaurants"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="product-container mt-5">
        <Row>
          {restaurants.map((item, index) => (
            <Col className='col-lg-4 col-sm-4 col-12' key={index}>
              <div className="card text-white bg-dark mb-3 p-3">
                <h4 className="card-header bg-white card-title text-dark mb-3">{item.name}</h4>
                <div className="card-body p-0">
                  <p className="card-title"><span>Description</span>: {item.description}</p>
                  <p className="card-title"><span>City</span>: {item.city}</p>
                  <p className="card-title"><span>Address</span>: {item.address}</p>
                  <p className="card-title"><span>Contact Number</span>: {item.cntnum}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Customerfooter />
    </main>
  );
}