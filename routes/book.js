const router = require("express").Router();
const Book = require("../controllers/book");
const isAuthorized = require("../util/auth");

router.get("/books", isAuthorized, Book.getBooksByUserId);
router.post("/books", isAuthorized, Book.createBook);
router.put("/books", isAuthorized, Book.updateBook);
router.delete("/books/:id", isAuthorized, Book.deleteBook);

router.get("/search-books/:query", isAuthorized, Book.searchBook);

module.exports = router;
