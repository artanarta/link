import Sidebar from "../../Components/Sidebar/Sidebar";
import picUpload from "../../Assets/Images//upload.png";
import React, { useState } from "react";
import { Row, Col, Navbar } from "react-bootstrap";
import { API } from "../../Config/api";
import waysLink from "../../Assets/Images/waysLink.png";
import Style from "./AddLink.module.css";
import { useHistory } from "react-router-dom";

export default function AddLink() {
    const [preview, setPreview] = useState(null);
    let history = useHistory();

    const [formTemplate, setformTemplate] = useState({
      titleTemplate: "",
      description: "",
      image: "",
    });

    const [formLink, setformLink] = useState([
      {
        title: "",
        url: "",
        logo:"",
        previewImage: "",
      },
      {
        title: "",
        url: "",
        logo:"",
        previewImage: "",
      },
    ]);

    const addTemplate = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.set("titleTemplate", formTemplate.titleTemplate);
        formData.set("description", formTemplate.description);
        formData.set("image", formTemplate.image[0], formTemplate.image[0].name);
        formLink.map(async(item) => {
             await formData.append("logo", item.logo[0]);
        });

        formLink.map((item) => {
            formData.append("title", item.title);
        });

        formLink.map((item) => {
            formData.append("url", item.url);
        });

        const response = await API.post("/link/", formData, config);
        alert("Data Successfully Added");
        history.push("/myLink");
        console.log(response);
      
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeTemplate = (e) => {
      setformTemplate({
        ...formTemplate,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
      });
      if (e.target.name === "image") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

    const handleChangeTitleLink= (e, index) => {
      const content = [...formLink];
      content[index].title = e.target.value;
      setformLink(content);
    }
    
    const handleChangeUrlLink= (e, index) => {
      const content = [...formLink];
      content[index].url = e.target.value;
      setformLink(content);
    }

    const handleChangeImageLink= (e, index) => {
      const content = [...formLink];
        let urlpreviewImage = URL.createObjectURL(e.target.files[0]);
        content[index].previewImage = urlpreviewImage;
        let urlLogo = e.target.files;
        content[index].logo = urlLogo;
        setformLink(content);
     
    };

    const handleAddFormLink = () => {
      const content = [...formLink];
      content.push({ title: "", url: "", logo:"", previewImage: "" });
      setformLink(content);
    };

    return(
      <div>
      <Navbar className="header" expand="lg">
          <img src={waysLink} alt="" style={{marginLeft:"33px"}} height="30px" />
              <div className={Style.text}>
                   Template
              </div>
      </Navbar>
      <div className="row" >
       <div className="col-sm-2" >
         <Sidebar /> 
       </div>
       <div className="col-sm-8" style={{marginTop:"20px"}}>
          <p className={Style.createLink}>Create Link</p>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-warning text-light"
                  onClick={addTemplate}>
                  Publish Link
                </button>
              </div>
            <form>
                  <div style={{marginBottom:"50px"}}>
                  <label htmlFor="image">
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
                      <input
                          name="image"
                          type="file"
                          hidden
                          id="image"
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
                        name="titleTemplate"
                        type="text"
                        className="form-control"
                        placeholder="ex. Your Title"
                        value={formTemplate.titleTemplate}
                        onChange={handleChangeTemplate}
                    />
                  </div>
                  <div style={{marginBottom:"50px"}}>
                    <label style={{marginBottom:"10px"}}>Description</label>
                    <input
                        name="description"
                        type="text"
                        className="form-control"
                        placeholder="ex. Description Here"
                        value={formTemplate.description}
                        onChange={handleChangeTemplate}
                    />
                  </div>
                  <div >
                    {formLink.map((item, index) => {
                      return (
                        <div style={{marginBottom:"20px"}}>
                          <Row key={index}>
                             <Col sm={3}>
                                  <div style={{marginBottom:"10px"}}>
                                      <span style={{marginRight:"50px"}}>
                                        {item.previewImage !== "" ? (
                                        <img
                                            style={{width:"55%", height:"55%"}}
                                            src={item.previewImage}
                                            alt="image"
                                        />
                                        ) : (
                                        <img src={picUpload}  style={{marginBottom:"50px"}} alt="previewLink" />
                                        )}
                                      </span>
                                      <label htmlFor={`logo${index}`}>
                                        <input
                                            name={`logo${index}`}
                                            type="file"
                                            hidden
                                            id={`logo${index}`}
                                            onChange={(e) => handleChangeImageLink(e, index)}
                                            required
                                        />
                                  
                                      <span className=" btn btn-warning text-light" style={{marginTop:"10px"}}>
                                          Upload
                                      </span>
                                      </label>
                                </div>
                            </Col>
                            <Col>
                            <div style={{marginBottom:"20px"}}>
                                <label style={{marginBottom:"10px"}}>
                                  Title Link
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Please input title link"
                                    value={item.title}
                                    onChange={(e) => handleChangeTitleLink(e, index)}
                                />
                              </div>
                              <div>
                              <label style={{marginBottom:"10px"}}>Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="www.example.com"
                                    name="url"
                                    value={item.url}
                                    onChange={(e) => handleChangeUrlLink(e, index)}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleAddFormLink} type="button"
                    className="btn btn-warning text-light">
                    Add New Link
                  </button>
                </form>
    </div>
    </div>
    </div>

       
    )
}