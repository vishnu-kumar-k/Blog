import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import delete1 from "../images/delete1.png";
import edit1 from "../images/edit1.png";
import { Menu } from "../components/Menu";
import { Col, Container, Row } from "react-bootstrap";
import axios from "../axios/Axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { post, Posts } from "../Atom/Atom";
import Logo from "../images/logo.png"
import "../stylesheet/Single.scss";
 const Single = () => {
  const [posts, setPosts] = useState([]);
  const[id,setId]=useRecoilState(post);
  
  const navigate=useNavigate();
 
   
  useEffect(() => {
    axios.get(`/posts?id=${id}`).then(async (res) => {
      console.log(res.data.result);
      await setPosts(res.data.result);
    }, [])
    .catch((err)=>
    {
      console.log(err)
    })
  }, []);
  
  
  return (
    <Container fluid>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <div className="Single">
        
          <img src={Logo} />
          <p>{posts.id}</p>
          <h2>{posts.tittle}</h2>
          <h5>{posts.catagory}</h5>
          <p>{posts.des}</p>
          </div>
        </Col>
        <Col md={2}></Col>
        
      </Row>
    </Container>
  );
};

export default Single;