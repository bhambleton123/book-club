const BookNote = require("../database/index").BookNote;

const getNotesByBookId = (bookId, cb) => {
  BookNote.findAll({
    where: { bookId },
    order: [["id", "ASC"]]
  })
    .then(books => {
      cb(null, books);
    })
    .catch(err => {
      cb(err);
    });
};

const createNote = (content, bookId, cb) => {
  BookNote.create({ content, bookId })
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
};

const updateNoteById = (id, content, cb) => {
  BookNote.update(
    { content },
    {
      where: {
        id
      }
    }
  )
    .then(() => {
      return BookNote.findAll({
        where: {
          id
        }
      });
    })
    .then(note => {
      cb(null, note);
    })
    .catch(err => {
      cb(err);
    });
};

const deleteNoteById = (id, cb) => {
  BookNote.destroy({
    where: {
      id
    }
  })
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
};

module.exports = {
  getNotesByBookId,
  createNote,
  updateNoteById,
  deleteNoteById
};
