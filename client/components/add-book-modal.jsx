import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./book.jsx";
import "../styles/modal.css";

export default function AddBookModal({ setToggle, addBook, user }) {
  const [searchBooks, setSearchBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const search = () => {
    if (searchInput.length > 0) {
      axios
        .get(`/api/search-books/${searchInput}`)
        .then(res => {
          setSearchBooks(res.data);
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const addBookCloseModal = (title, author, genre, imageUrl) => {
    addBook(title, author, genre, imageUrl);
    setToggle(false);
  };

  return (
    <div id="modal-wrapper">
      <button onClick={() => setToggle(false)} id="close">
        Close
      </button>
      <span id="book-search">
        <div id="search-wrapper">
          <input
            id="search-input"
            onChange={e => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search for book"
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
                  clickFunction={() =>
                    addBookCloseModal(
                      book.title,
                      book.author[0],
                      book.genre[0],
                      book.imageUrl.thumbnail
                    )
                  }
                  modal={true}
                  user={user}
                  imageUrl={book.imageUrl ? book.imageUrl.thumbnail : ""}
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
