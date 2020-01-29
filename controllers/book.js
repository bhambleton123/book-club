const models = require("../models/book");

const getBooksByUserId = (req, res) => {
  models.getBooksByUserId(req.user.id, (err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
};

const getBookById = (req, res) => {
  models.getBookById(req.nextParams.id, (err, book) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(book);
  });
};

const createBook = (req, res) => {
  models.createBook(
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.imageUrl,
    req.user.id,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const updateBook = (req, res) => {
  models.updateBook(
    req.body.id,
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.imageUrl,
    req.user.id,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const deleteBook = (req, res) => {
  models.deleteBook(req.nextParams.id, req.user.id, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(response);
  });
};

const searchBook = (req, res) => {
  models.searchBook(req.nextParams.query, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(response);
  });
};

module.exports = {
  getBooksByUserId,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBook
};
