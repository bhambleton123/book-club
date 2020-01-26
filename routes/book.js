const router = require("express").Router();
const Book = require("../controllers/book");
const isAuthorized = require("../util/auth");

router.get("/books", isAuthorized, Book.getBooksByUserId);
router.post("/books", isAuthorized, Book.createBook);
router.put("/books", isAuthorized, Book.updateBook);
router.delete("/books", isAuthorized, Book.deleteBook);

module.exports = router;
