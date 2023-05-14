import axios from "../axios/Axios.js";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToastContainer,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "../stylesheet/Write.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { jsonwebtoken, Load } from "../Atom/Atom.js";
import Loading from "./Loading.js";
export const Write = () => {
  const [tittle, setTittle] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [imageName, setImageName] = useState();
  const navigate = useNavigate();
  const jwt = useRecoilValue(jsonwebtoken);
  const [loading, setLoading] = useRecoilState(Load);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageName(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    var flag = true;
    if (tittle.length < 10) {
      flag = false;
      toast.warning("Title length is small", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
    if (des.length < 100) {
      flag = false;
      toast.info("Write some more", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
    if (category.length === 0) {
      flag = false;
      toast.info("Select the Category", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
  
    if (!flag) {
      return; // Stop further execution if validation fails
    }
  
    if (image === null) {
      toast.warning("Please Choose Image");
      return; // Stop further execution if image is not selected
    }
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", imageName);
  
    try {
      const uploadResponse = await axios.post("/uploadimage", formData, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
  
      if (uploadResponse.data.status) {
        setImageurl(uploadResponse.data.location);
  
        setLoading(true);
  
        const currentDate = new Date();
        const dates = currentDate.toISOString().slice(0, 10);
  
        try {
          const addPostResponse = await axios.post(
            "/addposts",
            {
              tittle: tittle,
              des: des,
              date: dates,
              img: uploadResponse.data.location,
              category: category,
              jwt: jwt,
            },
            { withCredentials: true }
          );
  
          await setLoading(false);
  
          if (addPostResponse.data.status) {
            toast.success(addPostResponse.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              closeOnClick: false,
              pauseOnHover: true,
            });
  
            setTimeout(() => {
              //navigate("/mypost");
            }, 5000);
          } else {
            toast.info(addPostResponse.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              closeOnClick: false,
              pauseOnHover: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Try After Sometime");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className="write-container">
            <form>
              <Row>
                <Col md={8}>
                  <div className="content">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={tittle}
                      onChange={(e) => setTittle(e.target.value)}
                    />
                    <div className="editorContainer">
                      <ReactQuill
                        theme="snow"
                        className="editor"
                        value={des}
                        onChange={setDes}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="menu">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
        

                    

                    <div className="item">
                      <h1>Category</h1>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Open this select menu</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Business and finance">
                          Business and finance
                        </option>
                        <option value="Technology">Technology</option>
                        <option value="News and current events">
                          News and current events
                        </option>
                        <option value="Arts and culture">
                          Arts and culture
                        </option>
                      </Form.Select>
                    </div>
                    <Button onClick={handleSubmit} className="outline-success">
                      Publish
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};
