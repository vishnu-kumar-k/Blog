import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const Write = () => {
  const [value, setValue] = useState(""); //Stores the value that is return for the publishing
  console.log(value);
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input style={{ display: "none" }} type="file" id="file" name="" />
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as Draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Catagory</h1>
          <div className="cat">
            <input type="radio" name="cat" id="art" />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" id="science" />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" id="art" />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" id="food" />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" id="dance" />
            <label htmlFor="dance">Dance</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" id="food" />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};
