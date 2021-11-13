    import React from "react";
    import Sidebar from "../../Components/Sidebar/Sidebar";
    import { API } from "../../Config/api";
    import { useState, useEffect } from "react";
    import MyLinksComp from "../../Components/MyLink/MyLinksComp";
    import { Navbar } from "react-bootstrap";
    import waysLink from "../../Assets/Images/waysLink.png";
    import MyLinksStyle from "./MyLinks.module.css";
    import {  Row, Col } from "react-bootstrap";
    import view from "../../Assets/Images/View.png";
    import edit from "../../Assets/Images/Edit.png";
    import del from "../../Assets/Images/Delete.png";
    import { useHistory } from "react-router";

    const MyLinks = (item) => {
        const [brands, setBrands] = useState([]);
        console.log(brands, "List brands")
        let history = useHistory();

        const [searchTerm, setSearchTerm] = useState("");
        const [filteredResult, setFilteredResult] = useState([]);
    
          const searchData = (value) => {
            setSearchTerm(value);
            if (searchTerm !== "") {
              const filteredData = brands.filter((item) => {
                return Object.values(item)
                  .join("")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              });
              setFilteredResult(filteredData);
            } else {
              setFilteredResult(brands);
            }
          };

          const getBrands = async () => {
            try {
              const response = await API.get("/links");
              setBrands(response.data.data.brands);
            } catch (error) {
              console.log(error);
            }
          };

          const ViewCount = async (id) => {
            try {
              const response = await API.patch(`/brand/${id}`);
            } catch (error) {
              console.log(error);
            }
          };

          const redirectView = (id) => {
            ViewCount(id);
            history.push("/view/" + id);
          };

          useEffect(() => {
            getBrands();
          }, []);

        return (
            <>
            <Navbar className="header" expand="lg">
            <img src={waysLink} alt="" style={{marginLeft:"33px"}} height="30px" />
                <div className={MyLinksStyle.text}>
                    My Links
                </div>
            </Navbar>
            <div className="row" >
            <div className="col-md-2" >
              <Sidebar /> 
            </div>
            <div className="col-md-8" style={{marginTop:"35px", }}>
            <form>
              <div className="row" style={{marginBottom:"30px"}}>
                <div className="p-2 w-auto" style={{marginBottom:"20px"}}>
                  <span className="fw-bold me-3">All Links</span>{" "}
                  <span className="p-2 bg-warning text-light rad w-auto">
                    {brands?.length}
                  </span>
                </div>
                <div class="col-sm-9">
                  <input
                    type="text"
                    className="mb-2 me-3 bg-transparent form-control no-border"
                    placeholder="Find your link"
                    name="search"
                    onChange={(e) => searchData(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {searchTerm.length > 1
            ? filteredResult.map((item) => {
              return (
                <>
                <Row className="mb-3" >
                  <Col>
                    <img
                     style={{width:"30%"}}
                     src={item.logo}
                     alt="pic"
                    />
                  </Col>
                  <Col style={{marginTop:"5px"}}>
                    <Row>
                      <span className="fw-bolder">{item.title}</span>
                    </Row>
                    <Row>
                      <span className="text-muted">{item.url}</span>
                    </Row>
                  </Col>
                  <Col >
                    <Row>
                    <span className="fw-bolder text-center">
                        {item.template.viewCount}
                      </span>
                    </Row>
                    <Row>
                      <span className="text-muted text-center">Brand Visit</span>
                    </Row>
                  </Col>
                  <Col style={{marginLeft:"25px"}}>
                  <Row> 
                      <Col>
                          <span>
                            <img src={view} alt="view" style={{height:"29px", marginRight:"3px", cursor:"pointer"}}  onClick={() =>redirectView((item.template.id))}  />
                          </span>
                          <span>
                            <img src={edit} alt="edit" style={{height:"29px", marginRight:"3px",cursor:"pointer"}} onClick={() => {history.push("/edit/" + item.id)}} />
                          </span>
                      </Col>
                  </Row>
          </Col>
                 
                </Row>
              </>
                );
              })
             : brands?.map((item, index) => (
                <MyLinksComp getBrands={getBrands}  item={item} key={index} />
              ))}
            </div>
            
            </div>
            </>
        );
    };

    export default MyLinks;
