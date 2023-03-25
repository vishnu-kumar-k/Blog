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
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const jwt=useRecoilValue(jsonwebtoken);
  const[loading,setLoading]=useRecoilState(Load);
  const Handle = async(e) => {
    e.preventDefault();
    var flag = true;
    if (tittle.length < 10) {
      flag = false;
      toast.warning("Tittle length is small", {
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
    if (image.length === 0) {
      flag = false;
      toast.warning("Provide image url", {
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
    if (flag) {
      setLoading(true)
      
const currentDate = new Date();

const dates = await currentDate.toISOString().slice(0, 10);

      axios
        .post(
          "/addposts",
          {
            tittle: tittle,
            des: des,
            date: dates,
            img: image,
            category: category,
            jwt:jwt
          },
          { withCredentials: true }
        )
        .then(async(res) => {
          await setLoading(false);
          if (res.data.status) {
            toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              closeOnClick: false,
              pauseOnHover: true,
            });
            

            setTimeout(() => {
              navigate("/mypost");
            }, 5000);
          }
          else{
            toast.info(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              closeOnClick: false,
              pauseOnHover: true,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (<><ToastContainer />
  {loading?(<Loading />):(<Container>
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
                <Form.Control
                  type="url"
                  placeholder="Image Url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <div className="item">
                  <h1>Category</h1>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Open this select menu</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business and finance">Business and finance</option>
                    <option value="Technology">Technology</option>
                    <option value="News and current events">News and current events</option>
                    <option value="Arts and culture">Arts and culture</option>
                  </Form.Select>
                </div>
                <Button onClick={Handle} className="outline-success">
                  Publish
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </div>
      
    </Container>)}
  </>
    
  );
};
