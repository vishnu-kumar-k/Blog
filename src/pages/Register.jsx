import axios from "../axios/Axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Auth } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
import "../stylesheet/Register.scss";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(Auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const HandleSumbit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/register",
        {
          name: user.name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        
        if (result.data.status) {
          setUser({ status: true,name:user.name });
          
          toast.success(`Signed as ${user.name}`, {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: false,
            pauseOnHover: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.error(result.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: true,
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
        <Col lg={3} xs={0}></Col>
        <Col lg={6} xs={12}>
          <div className="auth">
            <h1>Signup</h1>
            <form onSubmit={HandleSumbit}>
              <input
                required
                className="form-control"
                type="text"
                placeholder="username"
                value={user.name}
                onChange={(e) => setUser({ name: e.target.value, login: true })}
              />
              <input
                required
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="form-control"
                required
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" class="btn btn-secondary">
                submit
              </button>
              <span>
                Have an account? <Link to="/Login">Login</Link>
              </span>
            </form>
            <ToastContainer />
          </div>
        </Col>
        <Col md={6} xs={0}></Col>
      </Row>
    </Container>
  );
};
