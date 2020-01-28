import React, { useState, useEffect } from "react";
import axios from "axios";

import AddBook from "./add-book.jsx";
import Book from "./book.jsx";
import "../styles/home.css";

export default function Home({ userName }) {
  const [books, setBooks] = useState([]);

  const addBook = (title, author, genre, imageUrl) => {
    axios
      .post("/api/books", {
        title,
        author,
        genre,
        imageUrl
      })
      .then(res => {
        axios
          .get("/api/books")
          .then(res => {
            setBooks(res.data);
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          });
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
    console.log("Hello did this work?");
  };

  useEffect(() => {
    axios
      .get("/api/books")
      .then(res => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div id="wrapper">
      <div id="home-container">
        {books.map(book => {
          return <Book imageUrl={book.imageUrl} title={book.title}></Book>;
        })}
        <AddBook addBook={addBook} />
      </div>
    </div>
  );
}
