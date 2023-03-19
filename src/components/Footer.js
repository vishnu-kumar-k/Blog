import axios from "../axios/Axios";
import React, {  useState } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { Auth } from "../Atom/Atom";


import "../stylesheet/Footer.scss";
export const Footer = () => {
  const[user]=useRecoilState(Auth);
  const[suggestions,setSuggestions]=useState("");
  const navigate=useNavigate();
  const handle=(e)=>{
    if(!user.status)
    {
      toast.warning("Please Login to write suggestions", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        pauseOnHover: true,
      });
      setTimeout(()=>{
        navigate("/login");
      },2000)
    }
    else
    {
      setSuggestions(e.target.value);
    }
  }

  const share = () => {
    navigator.share({
      title: 'My Website',
      url: window.location.href
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("/suggestions",{
      suggestions:suggestions
    },{withCredentials:true}).then((res)=>
    {
      if(res.data.status)
      {
        toast.success("Thank you for your kind suggestion", {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
      else
      {
        toast.danger("Something went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
    })
  }

  return (
    <div className="footer">
    <Container>
      
        <span>
          Mindverse - A name that suggests exploring the depths of the mind
          through writing and sharing ideas.
        </span>
        <p>
          The content on this website is for informational purposes only and
          should not be construed as professional advice. Mindverse does not
          guarantee the accuracy or completeness of any information on this site
          and will not be liable for any errors or omissions in this
          information. The opinions expressed on this website are those of the
          authors and do not necessarily reflect the views of Mindverse.
        </p>
        <button type="button" class="btn btn-secondary" onClick={share}>Click here to share mindverse</button>
        
        <p>
          Please contact us if you have any questions or concerns about the
          content on Mindverse.<a href="mailto:mindverse2023@gmail.com">mindverse2023@gmail.com</a>
        </p>
        <div class="form-group">
    
    <textarea class="form-control" id="e" rows="3" required  value={suggestions} onChange={handle} placeholder="Do you have any suggestions to improve mindeverse ? "></textarea><br />
    <button className="btn btn-outline-primary" onClick={handleSubmit} >Submit</button>
  </div><br />
        <b className="d-flex justify-content-center">Copyright © 2023 Mindverse. All rights reserved</b>
        <ToastContainer />
        </Container>
      </div>
    
  );
};
