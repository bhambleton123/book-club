const models = require("../models/book_notes");

const getNotesByBookId = (req, res) => {
  models.getNotesByBookId(req.nextParams.bookId, (err, notes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(notes);
  });
};

const createNote = (req, res) => {
  models.createNote(
    req.body.content,
    req.nextParams.bookId,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const updateNoteById = (req, res) => {
  models.updateNoteById(
    req.nextParams.id,
    req.body.content,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const deleteNoteById = (req, res) => {
  models.deleteNoteById(req.nextParams.id, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send([response]);
  });
};

module.exports = {
  getNotesByBookId,
  createNote,
  updateNoteById,
  deleteNoteById
};
