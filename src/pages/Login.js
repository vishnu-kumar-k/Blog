import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios/Axios";
import { useRecoilState } from "recoil";
import { Auth } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useRecoilState(Auth);
  const [password, setPassword] = useState();
  const HandleSumbit=async(e)=>
  {
    e.preventDefault();
    axios.post("login/",
    {
      email:email,
      password:password
    }).then((result)=>
    {
      if(result.data.status)
      {
        navigate("/");
      }
      else
      {
        console.log(result.data.msg)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="auth">
      <form onSubmit={HandleSumbit}>
        <h1>Login</h1>
        <input
          required
          type="text"
          placeholder="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input required type="password" placeholder="password" 
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
          />
        <input type="submit"/>
        <span>
          Don't you have an account?<Link to="/Register">Register</Link>
        </span>
      </form>
    </div>
  );
};
