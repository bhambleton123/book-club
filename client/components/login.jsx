import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
        <p id="submit">Log in</p>
        <p id="sign-up-text">
          Don't have an account? <Link to="/register">Sign up</Link>!
        </p>
      </form>
    </div>
  );
}
