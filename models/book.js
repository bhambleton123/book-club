const Book = require("../database/index").Book;

const createBook = (title, author, genre, imageUrl, userId, cb) => {
  Book.create({ title, author, genre, imageUrl, userId })
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
};

module.exports = {
  createBook
};
