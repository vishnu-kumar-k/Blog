import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheet/Navbar.scss";
import { useRecoilState } from "recoil";
import { Auth, categoryPostState, Count } from "../Atom/Atom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "../axios/Axios";
import { NavDropdown } from "react-bootstrap";

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
  const [count, setCount] = useRecoilState(Count);
  const navigate = useNavigate();

  //Handling Logout Function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (user.status) {
      await axios
        .get("/logout", { withCredentials: true })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      await setUser({ name: null, status: false });
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
  const handleHome=(e)=>{
    e.preventDefault();
    setCategoryPost({status:false,category:""});
    navigate("/");
  }

  return (
    <Navbar bg="light" expand="lg">
  <Container fluid>
    <Link className="head" onClick={handleHome}>
      Mindverse
    </Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="justify-content-end flex-grow-1 pe-3" style={{ maxHeight: "370px" }} navbarScroll>
        
        <NavDropdown className="link-style" title="Categories" id="navbarScrollingDropdown" style={{font:"inherit", color:"black",fontSize:"1.4em"}}>
        <NavDropdown.Item onClick={() => { setCategoryPost({ status: false, category: "" }); navigate("/"); setCount(0)}}>
            All
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => { setCategoryPost({ status: true, category: "Lifestyle" }); navigate("/"); setCount(0)}}>
            Lifestyle
          </NavDropdown.Item>
          <NavDropdown.Item  onClick={() => { setCategoryPost({ status: true, category: "Technology" });navigate("/"); setCount(0) }}>
            Technology
          </NavDropdown.Item>
          <NavDropdown.Item  onClick={() => { setCategoryPost({ status: true, category: "Business and finance" }); navigate("/"); setCount(0)}}>
          Business and finance
          </NavDropdown.Item>
          <NavDropdown.Item   onClick={() => { setCategoryPost({ status: true, category: "Arts and culture" });navigate("/"); setCount(0) }}>
          Arts and culture
          </NavDropdown.Item>
          <NavDropdown.Item   onClick={() => { setCategoryPost({ status: true, category: "News and current events" });navigate("/"); setCount(0) }}>
          News and current events
          </NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand>
          <Link className="link-style" onClick={handleWrite}>
            Write
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link className="link-style" onClick={myPost}>
            Mypost
          </Link>
        </Navbar.Brand>
      
      {user.status ? (
        <>
          <Navbar.Brand>
            <Link className="link-style-name"> {user.name} </Link>
          </Navbar.Brand>
          
        </>
      ) : (
        <></>
      )}
      <Navbar.Brand>
        <Link className="link-style-login" onClick={handleLogin} >
          {" "}
          {user.status ? "Logout" : "Login"}{" "}
        </Link>
      </Navbar.Brand>
      </Nav>
      <ToastContainer />
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};