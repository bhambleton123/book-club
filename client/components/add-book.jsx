import React, { useState } from "react";
import AddBookModal from "./add-book-modal.jsx";

export default function AddBook() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      {toggle ? (
        <AddBookModal setToggle={setToggle} />
      ) : (
        <div onClick={() => setToggle(!toggle)} id="add-book">
          <p>+</p>
        </div>
      )}
    </>
  );
}
