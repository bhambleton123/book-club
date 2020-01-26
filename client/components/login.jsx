import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/form.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      });
  };

  return (
    <div id="register">
      <form>
        <input
          id="userName"
          placeholder="username"
          onChange={e => setUserName(e.target.value)}
        />
        <input
          id="password"
          placeholder="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <p id="submit" onClick={submitForm}>
          Log in
        </p>
        <p id="sign-up-text">
          Don't have an account? <Link to="/register">Sign up</Link>!
        </p>
      </form>
    </div>
  );
}
