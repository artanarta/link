import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { API } from "../../Config/api";

const ViewLink = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [Links, setLinks] = useState(null);
  let history = useHistory();

  const getBrand = async (id) => {
    try {
      const response = await API.get(`/brand/${id}`);
      setBrand(response.data.data);
      setLinks(response.data.data.links);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(brand, "list view");

  const redirectURL = (url) => {
    window.open(`${url}`, "_blank");
  };

  useEffect(() => {
    getBrand(id);
  }, []);

  return (
    <>
      <Container fluid>
        <div className="mt-1 text-center">
          <div onClick={() => history.push("/myLink")}>
            <img
              className="w-25 "
              src={`http://localhost:5000/uploads/${brand?.image}`}
              alt="pic"
              style={{marginBottom:"20px", marginTop:"20px"}}
            />
          </div>
          <h4 className="fw-bold">{brand?.titleTemplate}</h4>
          <h5 className="text-muted" style={{marginBottom:"20px", marginTop:"10px"}} >{brand?.description}</h5>
          
           <Container>
           {Links?.map((item, index) => (
              <div className="bg-dark p-1 mb-2" style={{width:"700px", marginLeft:"220px"}}>
                <Row>
                  <Col>
                    <div className="text-start">
                      <img
                        width={50}
                        className="rad"
                        src={`http://localhost:5000/uploads/${item.logo}`}
                        alt={item?.title}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div style={{marginRight:"330px"}}>
                      <p
                        onClick={() => redirectURL(item.url)}
                        className="text-light "
                        style={{marginTop:"10px"}}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Container> 
        </div>
      </Container>
    </>
  );
}

export default ViewLink;