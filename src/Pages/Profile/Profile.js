import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useHistory, useParams } from "react-router";
import { UserContext } from "../../Context/userContext";
import ProfileStyle from "./Profile.module.css";
import { API } from "../../Config/api";
import waysLink from "../../Assets/Images/waysLink.png";
import { Navbar } from "react-bootstrap";

const Profile = () => {
  
  const [state ] = useContext(UserContext);
  let history = useHistory();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formData = {
        name: form.name,
        email: form.email,
      };

      const response = await API.patch("/user/" + state.user.id, formData, config );
    } catch (error) {
      console.log();
    }
  };

  const handleDelete = async (e) => {
    try {

      const response = await API.delete("/user/" + state.user.id);
      console.log(response.data.data.user);
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  
  const getUser = async (id) => {
    try {
      const response = await API.get("/user/" + id);

      setForm({
        ...form,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(state.user.id);
  }, []);

  return (
  <div>
    <Navbar className="header" expand="lg">
          <img src={waysLink} alt="" style={{marginLeft:"33px"}} height="30px" />
              <div className={ProfileStyle.text}>
                   My Account
              </div>
    </Navbar>
    <div className="row" >
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-sm-8" > 
        <form>
            <div >
              <div className={ProfileStyle.textWrapper}>
                <div >
                <p className={ProfileStyle.upperText}>Name</p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  className="bg-transparent no-border form-control"
                  placeholder="Email"
            />
                </div>
              </div>

              <div className={ProfileStyle.textWrapper}>
                <div >
                <p className={ProfileStyle.upperText}>Email</p>
                <input
                type="text"
                className="bg-transparent no-border form-control"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={form.name}
            />
                </div>
              </div>
              <button
              type="submit"
              className={ProfileStyle.buttonSaveAccount}
              onClick={handleSubmit}
            >
              Save Account
            </button>
            <button style={{borderRadius:"5px", marginLeft:"10px"}} onClick={handleDelete} className="btn-danger me-2 auto">
              Delete Account
            </button>
            </div>
            </form>
          </div>

    
    </div>
    </div>

  );
};

export default Profile;