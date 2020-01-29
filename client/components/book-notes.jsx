import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/book-notes.css";

export default function BookNotes({ match }) {
  const [book, setBook] = useState({});

  const getBook = () => {
    axios
      .get(`/api/books/${match.params.bookId}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div id="book-notes-container">
      <p id="book-title">{book.title}</p>
    </div>
  );
}
