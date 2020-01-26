import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/form.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const submitForm = () => {
    if (password === checkPassword) {
      axios
        .post("/api/register", {
          firstName,
          lastName,
          userName,
          password
        })
        .then(res => {
          console.log("Successfully added user");
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      console.log("Passwords don't match");
    }
  };
  return (
    <div id="register">
      <p id="register-text">Register</p>
      <form>
        <input
          id="first-name"
          placeholder="first name"
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          id="last-name"
          placeholder="last name"
          onChange={e => setLastName(e.target.value)}
        />
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
        <input
          id="check-password"
          placeholder="re-enter password"
          type="password"
          onChange={e => setCheckPassword(e.target.value)}
        />
        <p id="submit" onClick={submitForm}>
          Submit
        </p>
        <p id="sign-up-text">
          Already have an account? <Link to="/login">Log in</Link>!
        </p>
      </form>
    </div>
  );
}
