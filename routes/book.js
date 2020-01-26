const router = require("express").Router();
const Book = require("../controllers/book");
const isAuthorized = require("../util/auth");

router.post("/books", isAuthorized, Book.createBook);

module.exports = router;
