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
  
 
   
  useEffect(() => {
    axios.get(`/posts?id=${id}`, { withCredentials: true }).then(async (res) => {
      console.log(res.data);
      await setPosts(res.data.result);
    }, [])
    .catch((err)=>
    {
      console.log(err)
    })
  }, []);
  const dates = new Date(posts.date);
const d = dates.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  
  return (
    <Container fluid>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <div className="Single">
        
          <img src={posts.img} className="rounded mx-auto d-block"/>
          
          <h2>{posts.tittle}</h2>
         <p>Category: <span>{posts.category}</span></p>
          <p>Posted by: <span>{posts.username}</span></p>
          <strong>{d}</strong>
          <div dangerouslySetInnerHTML={{__html: posts.des}}></div>
          </div>
        </Col>
        <Col md={2}></Col>
        
      </Row>
    </Container>
  );
};

export default Single;