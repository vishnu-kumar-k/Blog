import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { Auth } from '../Atom/Atom'
import logo from "../images/logo.png"
import "../stylesheet/Navbar.scss"
export const Footer = () => {
  const[user,setUser]=useRecoilState(Auth);

  useEffect(()=>
  {
    var name=localStorage.getItem('user')
    if(name!==undefined && name!==null)
    {
      setUser({name:name,status:true})
    }

  },[])
  return (
      <Container>
        <div className='footer'>
        <Row>
          <Col xs={3}>
      <img src={logo} alt=""className='footer'/>
      </Col>
      
      <Col xs={3}>
      <span > Made with React</span>
      </Col>
      </Row>
      </div>
      </Container>
  
  )
}
