require("dotenv").config();
const Book = require("../database/index").Book;
const axios = require("axios");

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

const getBookById = (bookId, cb) => {
  Book.findAll({
    where: {
      id: bookId
    }
  })
    .then(book => {
      cb(null, book[0]);
    })
    .catch(err => {
      cb(err);
    });
};

const createBook = (title, author, genre, imageUrl, userId, cb) => {
  getBooksByUserId(userId, (err, books) => {
    if (err) {
      cb(err);
    }

    let isDuplicate = books.some(book => {
      return (
        book.dataValues.title === title &&
        book.dataValues.author === author &&
        book.dataValues.genre === genre
      );
    });

    if (!isDuplicate) {
      Book.create({ title, author, genre, imageUrl, userId })
        .then(res => {
          cb(null, res);
        })
        .catch(err => {
          cb(err);
        });
    } else {
      cb(null, "Duplicate book");
    }
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

//creating function that searches for book based on title using Google Books API
const searchBook = (query, cb) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6&key=${process.env.GOOGLE_API_KEY}`
    )
    .then(res => {
      return res.data.items.map(book => {
        return {
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors,
          genre: book.volumeInfo.categories,
          imageUrl: book.volumeInfo.imageLinks
        };
      });
    })
    .then(books => {
      cb(null, books);
    })
    .catch(err => {
      cb(err);
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
