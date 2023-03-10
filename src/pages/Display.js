import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { post } from "../Atom/Atom";
const Display = ({ ind, img, id, tittle, desc, n }) => {
  const navigate=useNavigate();
  const[p,setP]=useRecoilState(post);
 const handle=(e)=>
 {
  e.preventDefault();
  setP(id);
  navigate("/single")


 }
  return (
    <Row key={ind}>
      <Col md={4} sm={12} xs={12}>
        <div className="img">
          <img src={img} />
          <p>posted on:21/12/2002</p>
          <p>Posted by Vishnu</p>
        </div>
      </Col>
      <Col md={8} xs={12} sm={12}>
        <h1>{tittle}</h1>
        <h3>{desc}</h3>
        <p onClick={handle}>Readmore</p>
      </Col>
    </Row>
  );
};
export default Display;
