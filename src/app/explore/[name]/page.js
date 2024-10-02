"use client"

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';



const page = (props) => {

   const name=props.params.name
   console.log(name)

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
     </>
  )
}

export default page
