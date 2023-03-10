import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
export const Home = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    
    axios
      .get("posts")
      .then(async(res) => {
        
        await setPost(res.data.result);
        console.log(res.data.result);

        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);

  return (
    <Container fluid>
      {post.map((post, index) => (
        <Display
          ind={index}
          img={post.img}
          id={post.id}
          tittle={post.tittle}
          desc={post.n}
          n={post.des}
        />
      ))}
    </Container>
  );
};
