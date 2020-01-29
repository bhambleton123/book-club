import React, { useState } from "react";
import AddBookModal from "./add-book-modal.jsx";

export default function AddBook({ addBook, user }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <AddBookModal user={user} addBook={addBook} setToggle={setToggle} />
      ) : (
        <div onClick={() => setToggle(!toggle)} id="add-book">
          <p>+</p>
        </div>
      )}
    </>
  );
}
