const Book = require("../database/index").Book;

const getBooksByUserId = (userId, cb) => {
  Book.findAll({
    where: {
      userId
    }
  })
    .then(books => {
      cb(null, books);
    })
    .catch(err => {
      cb(err);
    });
};

const createBook = (title, author, genre, imageUrl, userId, cb) => {
  Book.create({ title, author, genre, imageUrl, userId })
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
};

const updateBook = (id, title, author, genre, imageUrl, userId, cb) => {
  Book.update(
    { title, author, genre, imageUrl },
    {
      where: {
        id,
        userId
      }
    }
  )
    .then(() => {
      return Book.findAll({
        where: {
          id
        }
      });
    })
    .then(book => {
      cb(null, book);
    })
    .catch(err => {
      cb(err);
    });
};

const deleteBook = (id, userId, cb) => {
  Book.destroy({
    where: {
      id,
      userId
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
  getBooksByUserId,
  createBook,
  updateBook,
  deleteBook
};
