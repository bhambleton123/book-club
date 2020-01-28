import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./book.jsx";
import "../styles/modal.css";

export default function AddBookModal({ setToggle }) {
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
      <span id="book-search">
        <button onClick={() => setToggle(false)} id="close">
          Close
        </button>
        <div id="search-wrapper">
          <input
            id="search-input"
            onChange={e => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <button id="search-button" onClick={search}>
            Submit
          </button>
        </div>
        <div style={{ display: "inlineBlock" }}>
          <span id="search-books-wrapper">
            {searchBooks.map(book => {
              return (
                <Book
                  imgUrl={book.imageUrl ? book.imageUrl.thumbnail : ""}
                  title={book.title}
                />
              );
            })}
          </span>
        </div>
      </span>
    </div>
  );
}
