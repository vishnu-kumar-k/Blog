import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu";
import { Col, Container, Row } from "react-bootstrap";
import axios from "../axios/Axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { jsonwebtoken, post, Posts } from "../Atom/Atom";
import "../stylesheet/Single.scss";
 const Single = () => {
  const [posts, setPosts] = useState([]);
  const[id,setId]=useRecoilState(post);
  const[similar,setSimilar]=useState();
  const jwt=useRecoilValue(jsonwebtoken)
   
  useEffect(() => {
    axios.post(`/posts?id=${id}`,{jwt:jwt}, { withCredentials: true }).then(async (res) => {
      
      await setPosts(res.data.result);
      await setSimilar(res.data.similarPost)
      console.log(similar)
    })
    .catch((err)=>
    {
      console.log(err)
    })
    window.scrollTo(0,0);
  }, [id]);
 
  const dates = new Date(posts.date);
const d = dates.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  
  return (
    <Container fluid>
      <Row>
        
        <Col md={8}>
          <div className="Single">
        
          <img src={posts.img} className="rounded mx-auto d-block"/>
          
          <h4 >{posts.tittle}</h4>
         <p>Category: <span>{posts.category}</span></p>
          <p>Posted by: <span>{posts.username}</span></p>
          <strong>{d}</strong>
          <div dangerouslySetInnerHTML={{__html: posts.des}}></div>
          </div>
        </Col>
        <Col md={4}>
                <div className="similar-post">
                  <h1>Similar posts from {posts.username}</h1>
                  {similar===undefined||similar.length===0 ?(<>No posts</>):(
                  
                    similar.map((post,index)=>(<div className="similar-post-container">
                      <img src={post.img} alt="" className="rounded mx-auto d-block" />
                    <p className="rounded mx-auto d-block">  <span>{post.tittle}</span></p>
                     <p className="rounded mx-auto d-block">Category: <b>{post.category}</b></p>
                     <p className="rounded mx-auto d-block">Posted on: <b>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</b></p>
                      <button className="rounded mx-auto d-block btn btn-outline-primary" onClick={()=>{
                        
                        setId(post.id)}}>Readmore....</button>
                      </div>
                    ))
                  )}
                </div>
              
        </Col>
        
      </Row>
    </Container>
  );
};

export default Single;