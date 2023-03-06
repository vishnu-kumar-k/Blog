import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from "../images/logo.png"
export const Footer = () => {
  return (
      <Container>
        <Row>
          <Col xs={3}>
      <img src={logo} alt="" className='footer'/>
      </Col>
      <Col xs={3}></Col>
      <Col xs={3}>
      <span > Made with React</span>
      </Col>
      </Row>
      </Container>
  
  )
}
