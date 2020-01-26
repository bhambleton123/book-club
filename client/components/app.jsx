import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Register from "./register.jsx";
import Login from "./login.jsx";
import Nav from "./nav.jsx";
import Home from "./home.jsx";

import "../styles/app.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("/api/user")
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Router>
      {!user ? <Redirect to="/login" /> : ""}
      {!user ? "" : <Nav />}
      <Switch>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          {user ? (
            <Home userName={user.userName} userId={user.id} />
          ) : (
            "Nobody logged in"
          )}
        </Route>
      </Switch>
    </Router>
  );
}
