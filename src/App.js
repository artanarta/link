import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./Pages/Landing/Landing";
import { UserContext } from "./Context/userContext";
import { API } from "./Config/api";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import AddLink from "./Pages/Add Link/AddLink";
import { setAuthToken } from "./Config/api";
import MyLinks from "./Pages/MyLinks/MyLinks";
import ViewLink from "./Pages/ViewLink/ViewLink";
import EditLink from "./Pages/Edit Link/EditLink";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      history.push("/");
    }if (state.isLogin === true) {
      history.push("/addLink");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      console.log(payload, "payload");
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/addLink">
              <AddLink />
            </Route>
            <Route exact path="/myLink">
              <MyLinks />
            </Route>
            <Route exact path="/view/:id">
              <ViewLink />
            </Route>
            <Route exact path="/edit/:id">
              <EditLink />
            </Route>
          </Switch>


  );
}

export default App;