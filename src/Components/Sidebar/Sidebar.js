import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import sidebar1 from "../../Assets/Images/sidebar 1.png";
import sidebar2 from "../../Assets/Images/sidebar 2.png";
import sidebar3 from "../../Assets/Images/sidebar 3.png";
import SidebarStyle from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import logout from "../../Assets/Images/logout 1.png";


const Sidebar = () => {
  const [ state , dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  };

  return (
    <Nav  style={{marginLeft:"20px", marginTop:"20px"}}>
      <Nav.Item >
        <Nav.Link to="/addLink" as={Link} style={{display:"flex"}}>
        <img src={sidebar3} alt="user1" style={{height:"21px", marginRight:"15px"}} />
          <p className={SidebarStyle.menus}  style={{marginBottom:"15px"}}>Template</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/profile" as={Link} style={{display:"flex"}}>
        <img src={sidebar2} alt="subs"  style={{height:"21px", marginRight:"15px"}} />
          <p className={SidebarStyle.menus} style={{marginBottom:"15px"}}>Profile</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/myLink" as={Link} style={{display:"flex"}}>
        <img src={sidebar1} alt="subs"  style={{height:"21px", marginRight:"15px"}} />
          <p className={SidebarStyle.menus} style={{marginBottom:"15px"}}>Link</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/" as={Link}  style={{display:"flex"}}>
        <img src={logout} alt="logout"  style={{height:"21px", marginRight:"15px"}} />
        <p  onClick={handleLogout} className={SidebarStyle.menus} style={{marginBottom:"15px"}} >Logout</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default Sidebar;