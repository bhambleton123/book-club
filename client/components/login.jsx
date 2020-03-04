import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/form.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const submitForm = () => {
    axios
      .post("/api/login", {
        userName,
        password
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div id="register">
      <form>
        <header className="head-form">
          <h2>Log In</h2>
          <p>login here using your username and password</p>
        </header>
        <input
          className="form-input"
          id="userName"
          placeholder="@Username"
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className="form-input"
          id="password"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button" id="submit" onClick={submitForm}>
          Log in
        </button>

        <footer className="head-form">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>!
          </p>
        </footer>
        {toggle ? (
          <div className="speech bottom">
            <div onClick={() => setToggle(!toggle)} className="x"></div>
            Username: demo <br /> Password: password
        </div>
        ) : ""}
      </form>
    </div>
  );
}