import Sidebar from "../../Components/Sidebar/Sidebar";
import picUpload from "../../Assets/Images//upload.png";
import React, { useState,useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { API } from "../../Config/api";
import { useParams, useHistory } from "react-router-dom";

export default function EditLink() {
    const [preview, setPreview] = useState(null);
    const { id } = useParams();

    const [formTemplate, setformTemplate] = useState({
      title: "",
      url: "",
      logo: "",
    });

    const changeLink = async (e) => {
        try {
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.set("title", formTemplate.title);
        formData.set("url", formTemplate.url);
        formData.set("logo",  formTemplate.logo[0], formTemplate.logo[0].name);
      
        const response = await API.patch("/link/" + id, formData, config);
        console.log(response);
        alert("Data Successfully Changed");
      
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeTemplate = (e) => {
      setformTemplate({
        ...formTemplate,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
      });
      if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };


    return(
      <div className="row" >
       <div className="col-sm-2" >
         <Sidebar /> 
       </div>
       <div className="col-sm-6" style={{marginTop:"20px"}}>
       <Col >
              <h2>Edit Link</h2>
       </Col>
       <form onSubmit={changeLink}>
            <Col >
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-warning text-light"
                  onClick={changeLink}>
                  Publish Link
                </button>
              </div>
            </Col>
           
                  <div style={{marginBottom:"50px"}}>
                    <span  style={{marginRight:"50px"}}>
                      {preview !== null ? (
                      <img
                          style={{width:"22%", height:"22%"}}
                          src={preview}
                          alt="preview"
                       />
                      ) : (
                      <img src={picUpload} alt="preview" />
                      )}
                    </span>
                    <label htmlFor="file">
                      <input
                          name="logo"
                          type="file"
                          hidden
                          id="file"
                          onChange={handleChangeTemplate}
                          required
                      />
                     <span className=" btn btn-warning text-light">
                        Upload
                      </span>
                    </label>
                  </div>
                  <div style={{marginBottom:"30px"}}>
                    <label style={{marginBottom:"10px"}}>Title</label>
                    <input
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder="ex. Your Name"
                        value={formTemplate.title}
                        onChange={handleChangeTemplate}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="text-muted mb-2">url</label>
                    <input
                        name="url"
                        type="text"
                        className="form-control"
                        placeholder="ex. Your url"
                        value={formTemplate.url}
                        onChange={handleChangeTemplate}
                    />
                  </div>
                </form>
    </div>
    </div>

       
    )
}