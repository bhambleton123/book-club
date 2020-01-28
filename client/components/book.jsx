import React from "react";

export default function Book({ imageUrl, title, addBook }) {
  return (
    <div className="book-container">
      <p>{title}</p>
      <img onClick={addBook} className="book-image" src={imageUrl} />
    </div>
  );
}
