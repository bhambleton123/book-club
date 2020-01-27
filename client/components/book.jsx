import React from "react";

export default function Book({ imgUrl, title }) {
  return (
    <div className="book-container">
      <p>{title}</p>
      <img className="book-image" src={imgUrl} />
    </div>
  );
}
