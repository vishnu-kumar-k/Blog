import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryPostState, Count, jsonwebtoken, Load, Posts } from "../Atom/Atom";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
import Loading from "./Loading";
export const Home = () => {
  const [post, setPost] = useRecoilState(Posts);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useRecoilState(Count);
  const [len, setLen] = useState(0);
  const jwt=useRecoilValue(jsonwebtoken);
  const [categoryPost, setcategoryPost] = useRecoilState(categoryPostState);
  const[loading,setLoading]=useRecoilState(Load);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`posts?category=${categoryPost.category}`,{jwt:jwt}, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);
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
    <Container>
      {loading?(<Loading />):(<>
      {status ? (
        post.map((post, index) => (
          <Display
          flag={false}
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
      
      {len > 10 && count !== 0 ? <Button onClick={handleBack}  variant="info float-start">Previous page</Button> : <></>}
      {len > 10 && len>count+10 ? <Button onClick={handleNext}  variant="info rounded mx-auto d-block">Next page</Button> : <></>}
      </>)}
    </Container>
  );
};
