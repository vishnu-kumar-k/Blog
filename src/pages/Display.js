import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { deletePost, post } from "../Atom/Atom";
import "../stylesheet/Display.scss";
import { Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import axios from "../axios/Axios";
import { toast } from "react-toastify";
const Display = ({ ind, img, id, tittle, desc, n, date, name, category,flag }) => {
  const navigate = useNavigate();
  const [p, setP] = useRecoilState(post);
  const [showConfirm, setShowConfirm] = useState(false);
  const[del,Setdel]=useRecoilState(deletePost);
  const handle = (e) => {
    e.preventDefault();
    setP(id);
    navigate("/single");
  };
  

  
    
  

  const handleConfirmDelete = () => {
    axios.post("/delete",{id:id}).then((res)=>
    {
      if(res.data.status)
      {
        Setdel(prev=>!prev);
        toast.success(`Deleted Successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
      else
      {
        toast.warning(`Try After sometime`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
    }).catch((err)=>console.log(err))
    setShowConfirm(false);
  };

  
  const dates = new Date(date);
  const d = dates.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="Display">
      <Row key={ind}>
        {ind % 2 === 0 ? (
          <>
            <Col md={6} sm={12} xs={12}>
              <div className="img">
                <img src={img} alt=''/>
              </div>
            </Col>

            <Col md={6} xs={12} sm={12}>
              <h1>{tittle}</h1>
              <p>
                category: <strong>{category}</strong>
              </p>
              <p>
                Posted by: <span>{name}</span>
              </p>
              <p>
                posted on: <time>{d}</time>
              </p>
              <div class="d-flex justify-content-start" style={{gap:"5px"}}>
              <button onClick={handle} className="btn btn-outline-primary" >Readmore</button>{" "}
              {flag?(<button className="btn btn-outline-danger"  onClick={()=>setShowConfirm(true)} >Delete</button>):(<></>)}
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col md={6} xs={12} sm={12}>
              <h1>{tittle}</h1>
              <p>
                category: <strong>{category}</strong>
              </p>
              <p>
                Posted by:<span> {name}</span>
              </p>
              <p>
                posted on: <time>{d}</time>
              </p>
              <div class="d-flex justify-content-start" style={{gap:"5px"}}>
              <button onClick={handle} className="btn btn-outline-primary" >Readmore</button>{" "}
              {flag?(<button className="btn btn-outline-danger"  onClick={()=>setShowConfirm(true)} >Delete</button>):(<></>)}
              </div>
            </Col>
            <Col md={6} sm={12} xs={12}>
              <div className="img">
                <img src={img} />
              </div>
            </Col>
          </>
        )}
      </Row>
      <Modal show={showConfirm} onHide={()=>setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Display;
