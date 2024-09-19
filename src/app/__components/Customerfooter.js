"use client"
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Customerfooter = ()=> {
  return (
    <>
      <footer className='customer-footer-sec text-center'>
        <Container>
          <Row>
           <Col className='col-lg-12 col-sm-12 col-12'><h2>Footer is here</h2></Col>
          </Row>
         </Container>
      </footer>
    </>
  )
}

export default Customerfooter;
