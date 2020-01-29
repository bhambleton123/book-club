import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/book-notes.css";

export default function BookNotes({ match }) {
  const [book, setBook] = useState({});
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");
  const [editToggle, setEditToggle] = useState(-1);
  const [editText, setEditText] = useState("");

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

  const setEditToggleNumber = noteId => {
    if (noteId !== editToggle) {
      setEditToggle(noteId);
    } else {
      setEditToggle(-1);
    }
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

  const editNote = id => {
    axios
      .put(`/api/notes/${id}`, {
        content: editText
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err))
      .finally(() => {
        getNotes();
      });
  };

  const deleteNote = id => {
    axios
      .delete(`/api/notes/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => {
        getNotes();
      });
  };

  const deleteBook = () => {
    axios
      .delete(`/api/books/${book.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err))
      .finally(() => {
        window.location.reload();
      });
  };

  useEffect(() => {
    getBook();
    getNotes();
  }, []);

  return (
    <>
      <p onClick={deleteBook} id="delete">
        delete book
      </p>
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
          return (
            <>
              <li>{note.content}</li>
              <div className="change-note">
                <p
                  onClick={() => setEditToggleNumber(note.id)}
                  className="change-button"
                >
                  edit
                </p>
                <p
                  onClick={() => deleteNote(note.id)}
                  className="change-button"
                >
                  delete
                </p>
                {editToggle === note.id ? (
                  <>
                    <textarea
                      onChange={e => setEditText(e.target.value)}
                      name="edit-note"
                      id="edit-note"
                      cols="30"
                      rows="10"
                    >
                      {note.content}
                    </textarea>
                    <p
                      onClick={() => editNote(note.id)}
                      className="change-button"
                    >
                      submit
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
      </ol>
    </>
  );
}
