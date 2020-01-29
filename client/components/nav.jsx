import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Nav() {
  const signOut = () => {
    axios
      .get("/api/logout")
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div id="nav">
      <Link to="/" className="nav-button">
        <p>Home</p>
      </Link>
      <p id="title">Book Club</p>
      <div onClick={signOut} className="nav-button nav-button-right">
        <p>Sign out</p>
      </div>
    </div>
  );
}
