import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/book-notes.css";

export default function BookNotes({ match }) {
  const [book, setBook] = useState({});
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");

  const getBook = () => {
    axios
      .get(`/api/books/${match.params.bookId}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => console.error(err));
  };

  const getNotes = () => {
    axios
      .get(`/api/notes/book/${match.params.bookId}`)
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.error(err));
  };

  const toggleTrueFalse = () => {
    setToggle(!toggle);
  };

  const createNote = () => {
    axios
      .post(`/api/notes/book/${match.params.bookId}`, {
        content
      })
      .then(res => {
        console.log(res.data);
        getNotes();
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getBook();
    getNotes();
  }, []);

  return (
    <>
      <div id="book-notes-container">
        <p id="book-title">{book.title}</p>
        <p>by</p>
        <p>{book.author}</p>
        <button onClick={toggleTrueFalse} id="add-note">
          Add Note
        </button>
        <div>
          {toggle ? (
            <>
              <textarea
                placeholder="write your note"
                onChange={e => setContent(e.target.value)}
                name="content"
                id="content"
                cols="30"
                rows="10"
              />
              <button onClick={createNote} id="add-note">
                Post
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <ol id="book-notes-list">
        {notes.map(note => {
          return <li>{note.content}</li>;
        })}
      </ol>
    </>
  );
}
