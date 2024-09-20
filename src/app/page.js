'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Customerheader from "./__components/CustomerHeader";
import Customerfooter from "./__components/customerfooter";
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";





export default function Home() {

  const [locations, setlocations] = useState([]);

  useEffect(() => {
    locadLocations();
  }, [])

  let locadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations")
    response = await response.json()
    if (response.success) {
      setlocations(response.result)
    }

  }


  console.log(locations);

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
                    locations.map((item) => (
                      <option>
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
      <Customerfooter />
    </main>
  );
}
