import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { Posts } from "../Atom/Atom";
import axios from "../axios/Axios";
import "../stylesheet/Home.scss";
import Display from "./Display";
export const Mypost = () => {
  const [status, setStatus] = useState(false);
  const [post, setPost] = useRecoilState(Posts);

  useEffect(() => {
    axios
      .get("posts?userid=1", { withCredentials: true })
      .then(async (res) => {
        if (res.data.status) {
          setStatus(true);
          await setPost(res.data.result);
          console.log(res.data.result)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    </Container>
  );
};
