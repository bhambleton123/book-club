import React, { useState } from "react";
import AddBookModal from "./add-book-modal.jsx";

export default function AddBook({ addBook }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <AddBookModal addBook={addBook} setToggle={setToggle} />
      ) : (
        <div onClick={() => setToggle(!toggle)} id="add-book">
          <p>+</p>
        </div>
      )}
    </>
  );
}
