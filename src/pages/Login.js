import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios/Axios";
import { useRecoilState } from "recoil";
import { Auth } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useRecoilState(Auth);
  const [password, setPassword] = useState();
  const HandleSumbit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "login/",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then(async (result) => {
        if (result.data.status) {
          
          
          console.log(result)
          await setName({
            name: result.data.name,
            id:result.data.id,
            status: true,
          });
          
          toast.success(`Signed Sucessfully`, {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: false,
            pauseOnHover: true,
          });
          console.log(name);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.warning(result.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Row>
        <Col xs={0} md={3}></Col>
        <Col xs={12} md={6}>
          <div className="auth">
            <h1>Login</h1>
            <form onSubmit={HandleSumbit}>
              <input
                className="form-control"
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                required
                type="password"
                placeholder="password"
                value={password}
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit" class="btn btn-primary" style={{width:"fit-content"}}>
                submit
              </button>
              <span>
                Don't you have an account? <Link to="/Register">Register</Link>
              </span>
            </form>
            <ToastContainer />
          </div>
        </Col>
        <Col xs={0} md={3}></Col>
      </Row>
    </Container>
  );
};
