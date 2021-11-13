import {  Row, Col } from "react-bootstrap";
import view from "../../Assets/Images/View.png";
import edit from "../../Assets/Images/Edit.png";
import del from "../../Assets/Images/Delete.png";
import { API } from "../../Config/api";
import { useHistory } from "react-router";

const MyLinksComp = ({ item, index, getBrands  }) => {
    let history = useHistory(); 

    const deleteBrand = async (id) => {
        try {
          const response = await API.delete("link/"+ item.id);
          console.log(response, "deleteBrand");
          getBrands();
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

    return(
        <div>
        <Row key={index} style={{marginBottom:"25px"}}>
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
                <span className="fw-bolder">{item.template.titleTemplate}</span>
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
          <Col  style={{marginLeft:"25px"}}>
                <Row> 
                    <Col>
                        <span>
                           <img src={view} alt="view" style={{height:"29px", marginRight:"3px", cursor:"pointer"}}  onClick={() =>redirectView((item.template.id))} />
                        </span>
                        <span>
                           <img src={edit} alt="edit" style={{height:"29px", marginRight:"3px", cursor:"pointer"}} onClick={() => {history.push("/edit/" + item.id)}} />
                        </span>
                        <span>
                          <img src={del} alt="edit" style={{height:"29px", marginRight:"3px", cursor:"pointer"}} onClick={() =>deleteBrand((item.id))}  />
                        </span>
                    </Col>
                </Row>
          </Col>
       </Row>
       </div>
    );
}

export default MyLinksComp;