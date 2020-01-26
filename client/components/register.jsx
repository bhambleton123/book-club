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

  const submitForm = event => {
    event.preventDefault();
    if (password === checkPassword) {
      axios
        .post("/api/register", {
          firstName,
          lastName,
          userName,
          password
        })
        .then(res => {
          if (res.data === "SequelizeUniqueConstraintError") {
            document
              .getElementById("userName")
              .setCustomValidity("Username taken");
          } else {
            window.location.pathname = "/login";
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      document
        .getElementById("check-password")
        .setCustomValidity("Passwords don't match");
    }
  };

  return (
    <div id="register">
      <p id="register-text">Register</p>
      <form onSubmit={submitForm}>
        <input
          id="first-name"
          placeholder="first name"
          onChange={e => setFirstName(e.target.value)}
          required={true}
        />
        <input
          id="last-name"
          placeholder="last name"
          onChange={e => setLastName(e.target.value)}
          required={true}
        />
        <input
          id="userName"
          placeholder="username"
          onChange={e => setUserName(e.target.value)}
          onInput={e => e.target.setCustomValidity("")}
          required={true}
        />
        <input
          id="password"
          placeholder="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          required={true}
        />
        <input
          id="check-password"
          placeholder="re-enter password"
          type="password"
          onChange={e => setCheckPassword(e.target.value)}
          onInput={e => e.target.setCustomValidity("")}
          required={true}
        />
        <input type="submit" id="submit" value="submit" />
        <p id="sign-up-text">
          Already have an account? <Link to="/login">Log in</Link>!
        </p>
      </form>
    </div>
  );
}
