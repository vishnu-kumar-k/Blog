import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import delete1 from "../images/delete1.png";
import edit1 from "../images/edit1.png";
import { Menu } from "../components/Menu";
import { Col, Container, Row } from "react-bootstrap";
import axios from "../axios/Axios";
import { useRecoilState } from "recoil";
import { post } from "../Atom/Atom";

export const Single = () => {
  const [posts, setPosts] = useState([]);
  const[id,setId]=useRecoilState(post);
  // const [otherPost, setOtherPost] = useState();
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
        <Col md={8}>
        
          <img src={posts.img} />
          <p>{posts.id}</p>
          <h2>{posts.tittle}</h2>
          <h5>{posts.catagory}</h5>
          <p>{posts.des}</p>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};
