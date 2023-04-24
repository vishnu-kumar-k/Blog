import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "../axios/Axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { Auth, jsonwebtoken, Load, post } from "../Atom/Atom";
import "../stylesheet/Single.scss";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Single = () => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useRecoilState(post);
  const [similar, setSimilar] = useState();
  const jwt = useRecoilValue(jsonwebtoken);
  const [loading, setLoading] = useRecoilState(Load);
  const [user, setUser] = useRecoilState(Auth);
  const [like, setLike] = useState();
  const [liked, setLiked] = useState();
  const navigate=useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .post(`/posts?id=${id}`, { jwt: jwt }, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);
        await setPosts(res.data.result);
        await setSimilar(res.data.similarPost);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    axios
      .post("/like", {
        postId: id,
      })
      .then(async (result) => {
        console.log(result);
        await setLike(result.data.like);
      })
      .catch((err) => console.log(err));
    axios
      .post(
        "/getlike",
        {
          postId: id,
        },
        {
          headers: { jwt_token: jwt },
        }
      )
      .then((res) => {
        setLiked(res.data.like);
        console.log(liked)
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLike = () => {
    if(user.status){
    axios
      .post(
        "/putlike",
        { postId: id },
        {
          headers: {
            jwt_token: jwt,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          setLiked(1);
          setLike(prev=>prev+1);
        }
      });
    }
    else {
      toast.warning("please Login to unLike")
      setTimeout(()=>
      {
      navigate("/login")
      },2000
      )
    }
  };
  const handleUnlike=()=>{
    if (user.status) {
      axios.post("/unlike",{
        postId:id
      },{
        headers:{
          jwt_token:jwt,
        }
      }).then((result)=>{
        if(result.data.status)
        {
          setLiked(0);
          setLike(prev=>prev-1);
        }
      })
    } else {
      toast.warning("please Login to Like")
      setTimeout(()=>
      {
      navigate("/login")
      },2000
      )
    }
    
  }
  const dates = new Date(posts.date);
  const d = dates.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row>
            <Col md={8} sm={12} xs={12}>
              <div className="Single">
                <img src={posts.img} className="rounded mx-auto d-block" />

                <h4>{posts.tittle}</h4>
                <p>
                  Category: <span>{posts.category}</span>
                </p>
                <p>
                  Posted by: <span>{posts.username}</span>
                </p>
                {liked===0 ? (
                  <button onClick={handleLike} className="btn btn-outline-primary">
                    {like} Likes
                  </button>
                ) : (
                  <button
                    onClick={handleUnlike}
                    className="btn btn-primary"
                  >
                    {like} Likes
                  </button>
                )}
                <br />
                <strong>{d}</strong>
                <div dangerouslySetInnerHTML={{ __html: posts.des }}></div>
              </div>
            </Col>
            <Col md={4} sm={12} xs={12}>
              <div className="similar-post">
                <h1>Similar posts from {posts.username}</h1>
                {similar === undefined || similar.length === 0 ? (
                  <>No posts</>
                ) : (
                  similar.map((post, index) => (
                    <div className="similar-post-container">
                      <img
                        src={post.img}
                        alt=""
                        className="rounded mx-auto d-block img-fliud"
                      />
                      <p className="rounded mx-auto d-block">
                        {" "}
                        <span>{post.tittle}</span>
                      </p>
                      <p className="rounded mx-auto d-block">
                        Category: <b>{post.category}</b>
                      </p>
                      <p className="rounded mx-auto d-block">
                        Posted on:{" "}
                        <b>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </b>
                      </p>

                      <button
                        className="rounded mx-auto d-block btn btn-outline-primary"
                        onClick={() => {
                          setId(post.id);
                        }}
                      >
                        Readmore....
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Single;
