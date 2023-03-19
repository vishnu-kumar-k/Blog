import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryPostState, Posts } from "../Atom/Atom";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
export const Home = () => {
  const [post, setPost] = useRecoilState(Posts);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);
  const [len, setLen] = useState(0);
  const [categoryPost, setcategoryPost] = useRecoilState(categoryPostState);
  useEffect(() => {
    console.log("Category  " + categoryPost.category);
    axios
      .get(`posts?category=${categoryPost.category}`, { withCredentials: true })
      .then(async (res) => {
        if (res.data.status) {
          await setStatus(true);
          setLen(res.data.result.length);
          await setPost(res.data.result.slice(count,count+10));
          window.scrollTo(0,0);
        } else {
          setStatus(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryPost,count]);
  const handleNext=(e)=>{
    e.preventDefault();
    setCount(prev=>prev+10);
  }
  const handleBack=(e)=>{
    e.preventDefault();
    setCount(prev=>prev-10);
  }
  console.log(len);

  return (
    <Container fluid>
      {status ? (
        post.map((post, index) => (
          <Display
            category={post.category}
            ind={index}
            name={post.username}
            img={post.img}
            id={post.id}
            date={post.date}
            tittle={post.tittle}
            desc={post.n}
            n={post.des}
          />
        ))
      ) : (
        <p>No Posts</p>
      )}
      
      {len > 10 && count !== 0 ? <Button onClick={handleBack}  variant="outline-primary float-start">Previous page</Button> : <></>}
      {len > 10 && len>count+10 ? <Button onClick={handleNext}  variant="outline-primary rounded mx-auto d-block">Next page</Button> : <></>}
      
    </Container>
  );
};
