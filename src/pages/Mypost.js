import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { Posts } from "../Atom/Atom";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
export const Mypost = () => {
  const [status, setStatus] = useState(false);
  const [post, setPost] = useRecoilState(Posts);
  const [count, setCount] = useState(0);
  const [len, setLen] = useState(0);
  useEffect(() => {
    axios
      .get("posts?userid=1", { withCredentials: true })
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
  }, [count]);
  const handleNext=(e)=>{
    e.preventDefault();
    setCount(prev=>prev+10);
  }
  const handleBack=(e)=>{
    e.preventDefault();
    setCount(prev=>prev-10);
  }

  return (
    <Container fluid>
      {!status ? (
        <p>No Posts</p>
      ) : (
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
      )}
      {len > 10 && count !== 0 ? <Button onClick={handleBack}  variant="outline-primary float-start">Previous page</Button> : <></>}
      {len > 10 && len>count+10 ? <Button onClick={handleNext}  variant="outline-primary rounded mx-auto d-block">Next page</Button> : <></>}
    </Container>
  );
};
