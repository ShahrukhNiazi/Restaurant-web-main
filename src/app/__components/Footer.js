import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RestaurantFooter() {
  return (
    <>
      <footer className='footer-sec text-center'>
        <Container>
          <Row>
           <Col className='col-lg-12 col-sm-12 col-12'>Footer is here</Col>
          </Row>
         </Container>
      </footer>
    </>
  )
}

export default RestaurantFooter;
