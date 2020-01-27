import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./book.jsx";

export default function AddBookModal() {
  const [searchBooks, setSearchBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const search = () => {
    axios
      .get(`/api/search-books/${searchInput}`)
      .then(res => {
        setSearchBooks(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div id="modal-wrapper">
      <div id="book-search">
        <input
          onChange={e => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button onClick={search}>Submit</button>
        <div id="search-books-wrapper">
          {searchBooks.map(book => {
            <Book
              imgUrl={book.imageUrl ? book.imageUrl.thumbnail : ""}
              title={book.title}
            />;
          })}
        </div>
      </div>
    </div>
  );
}
