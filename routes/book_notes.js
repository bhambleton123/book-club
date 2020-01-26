const router = require("express").Router();
const BookNotes = require("../controllers/book_notes");
const isAuthorized = require("../util/auth");

router.get("/notes/book/:bookId", isAuthorized, BookNotes.getNotesByBookId);
router.post("/notes/book/:bookId", isAuthorized, BookNotes.createNote);
router.put("/notes/:id", isAuthorized, BookNotes.updateNoteById);
router.delete("/notes/:id", isAuthorized, BookNotes.deleteNoteById);

module.exports = router;
