import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryPostState, Posts } from "../Atom/Atom";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
export const Home = () => {
  const [post, setPost] = useRecoilState(Posts);
  const [status, setStatus] = useState(false);
  const [categoryPost,setcategoryPost] = useRecoilState(categoryPostState);
  useEffect(() => {
    if (0) {
      axios
        .get("posts", { withCredentials: true })
        .then(async (res) => {
          if (res.data.status) {
            await setPost(res.data.result);
            setStatus(true);
            console.log(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Category  "+categoryPost.category)
      axios
        .get(`posts?category=${categoryPost.category}`, { withCredentials: true })
        .then(async (res) => {
          if (res.data.status) {
            await setStatus(true);
            await setPost(res.data.result);
            
            console.log(res.data.result);
          }
          else
          {
            setStatus(false);
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryPost]);

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
    </Container>
  );
};
