import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheet/Navbar.scss";
import { useRecoilState } from "recoil";
import { Auth, categoryPostState } from "../Atom/Atom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "../axios/Axios";

//Handling Navbars
export const Navbars = () => {
  const [user, setUser] = useRecoilState(Auth);
  const [categoryPost, setCategoryPost] = useRecoilState(categoryPostState);
  useEffect(() => {
    if (!user.status) {
      axios.get("/verify", { withCredentials: true }).then(async (res) => {
        if (res.data.status) {
          await setUser({ name: res.data.name, status: true });
        }
      });
    }
  }, []);
  const navigate = useNavigate();

  //Handling Logout Function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (user.status) {
      await axios
        .get("/logout", { withCredentials: true })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      await localStorage.removeItem("name");
      await setUser({ name: null, status: false, id: null });
    } else {
      navigate("/login");
    }
  };
  console.log(user);
  const myPost = (e) => {
    e.preventDefault();
    console.log("Mypost");
    if (user.status) {
      navigate("/mypost");
    } else {
      toast.warning("Please Login to View Your Post", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
            style={{ maxHeight: "270px" }}
            navbarScroll
          >
            <Navbar.Brand>
              {" "}
              <Link className="link-style-write" onClick={handleWrite}>
                Write
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link
                className="link-style"
                value="art"
                onClick={() => {
                  setCategoryPost({status:true,category:"art"});
                }}
              >
                Art
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link
                className="link-style"
                value="tech"
                onClick={() => {
                  setCategoryPost({status:true,category:"tech"});
                }}
              >
                Tech
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {" "}
              <Link
                className="link-style"
                value="cinema"
                onClick={() => {
                  setCategoryPost({status:true,category:"cinema"});
                }}
              >
                Cinema
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {" "}
              <Link
                className="link-style"
                value="food"
                onClick={() => {
                  setCategoryPost({status:true,category:"food"});
                }}
              >
                Food{" "}
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {" "}
              <Link className="link-style" onClick={myPost}>
                Mypost{" "}
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
