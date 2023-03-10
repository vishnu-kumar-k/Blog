import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheet/Navbar.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { Auth } from "../Atom/Atom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "../axios/Axios";

//Handling Navbars
export const Navbars = () => {
  const [user, setUser] = useRecoilState(Auth);
  useEffect(() => {
    var t = localStorage.getItem("name");
    if (t !== null && t !== undefined) {
      setUser({ name: t, status: true });
    }
  }, []);
  console.log(user);
  const navigate = useNavigate();

  //Handling Logout Function
  const handleLogin = async(e) => {
    e.preventDefault();
    if (user.status) {
      await axios
        .get("/logout", { withCredentials: true })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
     await localStorage.removeItem("name");
     await  setUser({ name: null, status: false });
    } else {
      navigate("/login");
    }
  };

  const handleWrite = (e) => {
    e.preventDefault();
    console.log("what");
    if (user.status) {
      navigate("/write");
    } else {
      toast.warning("Please Login to Post a Blog", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link className="head" to="/">
          Blog
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="justify-content-end flex-grow-1 pe-3"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Navbar.Brand>
              {" "}
              <Link className="link-style-write" onClick={handleWrite}>
                Write
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link className="link-style" to="/Art">
                Art
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link className="link-style" to="/design">
                Design
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {" "}
              <Link className="link-style" to="/Cinema">
                Cinema
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {" "}
              <Link className="link-style" to="/food">
                Food{" "}
              </Link>
            </Navbar.Brand>
          </Nav>
          {user.status ? (
            <>
              <Navbar.Brand>
                <Link className="link-style"> {user.name} </Link>
              </Navbar.Brand>
              <br />
            </>
          ) : (
            <></>
          )}
          <Navbar.Brand>
            <Link className="link-style" onClick={handleLogin}>
              {" "}
              {user.status ? "Logout" : "Login"}{" "}
            </Link>
          </Navbar.Brand>

          <ToastContainer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
