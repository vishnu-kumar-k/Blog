import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { post } from "../Atom/Atom";
import "../stylesheet/Display.scss"
import logo from "../images/logo.png";
const Display = ({ ind, img, id, tittle, desc, n ,date,name,category}) => {
  const navigate=useNavigate();
  const[p,setP]=useRecoilState(post);
 const handle=(e)=>
 {
  e.preventDefault();
  setP(id);
  navigate("/single")
 }
 
 
  return (<div className="Display">
    <Row key={ind}>
      <Col md={4} sm={12} xs={12}>
        <div className="img">
          <img src={img} />
          <p>posted on:{date}</p>
          <p>Posted by {name}</p>
        </div>
      </Col>
      <Col md={8} xs={12} sm={12}>
        <h1>{tittle}</h1>
        <h3>{category}</h3>
        <p onClick={handle}>Readmore</p>
      </Col>
    </Row>
    </div>
  );
};
export default Display;
