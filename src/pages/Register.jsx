import axios from "../axios/Axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Auth } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useRecoilState(Auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const HandleSumbit = async (e) => {
    e.preventDefault();
    console.log(name);
    await axios
      .post("/register", {
        name: name,
        email: email,
        password: password
      })
      .then((result) => {
        console.log(result.data)
        if (result.data.status) {
          navigate("/");
        } else {
          console.log("Invalid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth">
      <form onSubmit={HandleSumbit}>
        <h1>Signup</h1>
        <input
          required
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" />
        <p>This is error!!</p>
        <span>
          Have an account?<Link to="/Login">Register</Link>
        </span>
      </form>
    </div>
  );
};
