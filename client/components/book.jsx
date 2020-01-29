import React from "react";
import { Link } from "react-router-dom";

export default function Book({
  imageUrl,
  title,
  clickFunction,
  user,
  bookId,
  modal
}) {
  return (
    <div className="book-container">
      <p>{title}</p>
      {!modal ? (
        <Link to={`/books/${bookId}`}>
          <img onClick={clickFunction} className="book-image" src={imageUrl} />
        </Link>
      ) : (
        <img onClick={clickFunction} className="book-image" src={imageUrl} />
      )}
    </div>
  );
}
