import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./register.jsx";
import Login from "./login.jsx";

import "../styles/app.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(user => {
        setUser(user.data);
        console.log(user);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Router>
        <div id="nav">
          <Link to="/" className="nav-button">
            <p>Home</p>
          </Link>
        </div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <p>Home component</p>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
