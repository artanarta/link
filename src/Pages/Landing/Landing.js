
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import waysLink from "../../Assets/Images/waysLink.png";
import PC from "../../Assets/Images/PC.png";
import Phone from "../../Assets/Images/Phone.png";
import Background from "../../Assets/Images/Bg.png";
import landingStyle from "./Landing.module.css";
import Signin from "../../Components/Modal/Sign in/Signin";
import SignUp from "../../Components/Modal/Sign up/Signup";
import { Button,Container, Col, Row } from "react-bootstrap";

const Landing = ({  }) => {

  return (
    <>
    <div >
      <div>
          <Navbar>
              <Link to="/" className="navbar" >
                <img src={waysLink} alt="" style={{marginLeft:"70px"}} height="35px" />
              </Link>
              <div className={landingStyle.button}>
              <p style={{ marginRight: "10px", fontFamily:"avenir"}}> <Signin /> </p>
              <p style={{ marginLeft: "10px", fontFamily:"avenir"}}> <SignUp /> </p>
              </div>
          </Navbar>
        <div class="container-fluid" style={{backgroundColor:"orange", height:"507px", backgroundImage:`url(${Background})` }}>
          <Row  style={{ marginLeft:"10px", marginRight:"10px", flexDirection:"row"}} >
            <Col style={{marginTop:"50px"}} >
              <div style={{marginBottom:"20px"}}>
                <p style={{color: "white",fontSize:"40px", fontFamily:"Avenir", fontWeight:"bold"}}>
                  The Only Link <br /> You'll Ever Need
                </p>
              </div>
              <div style={{marginBottom:"30px"}}>
                <p style={{color: "white", fontFamily:"Avenir", fontSize:"20px"}}>
                  Add a link for your Social Bio and optimize
                  <br />
                  your social media traffic.
                </p >
                <p style={{color: "white", fontFamily:"Avenir", fontSize:"20px"}}>Safe, fast and easy to use.</p>
              </div>
              <button  className="btn"  style={{borderRadius:"5px", cursor:"text",width:"200px", height:"40px", marginTop:"10px", backgroundColor:"black", color:"white", fontFamily:"Avenir", fontSize:"18px"}}>
                Get Started For Free
              </button>
            </Col>
            
            <Col style={{marginTop:"60px"}}>
               <img src={Phone} alt="phone" style={{width:"25%"}} />
               <img src={PC} alt="computer" style={{width:"75%"}}/>
            </Col>
            
          </Row>
        </div>
      </div>
    </div>
  </>
  );
};

export default Landing;
