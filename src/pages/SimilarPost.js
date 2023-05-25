import React from "react";
import { useRecoilState } from "recoil";
import { Auth, jsonwebtoken, Load, post, Redirect } from "../Atom/Atom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios/Axios";
import { HeartFill } from "react-bootstrap-icons";

export const SimilarPost = ({ pt }) => {
    const [id, setId] = useRecoilState(post);
    const [like, setLike] = useState();
  useEffect(() => {
    axios
      .post("/like", {
        postId: pt.id,
      })
      .then(async (result) => {
        await setLike(result.data.like);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="similar-post-container">
      <img
        src={pt.img}
        alt=""
        className="rounded mx-auto d-block img-fliud"
      />
      <p className="rounded mx-auto d-block">
        {" "}
        <span>{pt.tittle}</span>
      </p>
      <p className="rounded mx-auto d-block">
        Category: <b>{pt.category}</b>
      </p>
      
      <p className="rounded mx-auto d-block">
        Posted on:{" "}
        <b>
          {new Date(pt.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </b>
      </p>
      <button className="btn btn-danger">
       <HeartFill /> {like} Likes
      </button>

      <button
        className="rounded mx-auto d-block btn btn-outline-primary"
        onClick={() => {
          setId(pt.id);
        }}
      >
        Readmore....
      </button>
    </div>
  );
};
