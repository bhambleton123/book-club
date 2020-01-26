const models = require("../models/book");

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

module.exports = {
  createBook
};
