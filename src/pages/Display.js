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
 
const dates = new Date(date);
const d = dates.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });


 
  return (<div className="Display">
    <Row key={ind}>
      {ind%2===0?(<><Col md={6} sm={12} xs={12}>
        <div className="img">
          <img src={img} />
          
        </div>
      </Col>
      
      <Col md={6} xs={12} sm={12}>
        <h1>{tittle}</h1>
        <p>category: <strong>{category}</strong></p>        
          <p>Posted by: <span>{name}</span></p>
          <p>posted on: <time>{d}</time></p>
        <button onClick={handle}>Readmore</button>
      </Col></>):(<><Col md={6} xs={12} sm={12}>
        <h1>{tittle}</h1>
        <p>category: <strong>{category}</strong></p>
        
          <p>Posted by:<span> {name}</span></p>
          <p>posted on: <time>{d}</time></p>
        <button onClick={handle}>Readmore</button>

      </Col><Col md={6} sm={12} xs={12}>
        <div className="img">
          <img src={img} />
          
        </div>
      </Col></>

      )}
      
    </Row>
    </div>
  );
};
export default Display;
