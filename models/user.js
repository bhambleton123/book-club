require("dotenv").config();
const User = require("../database").User;
const bcrypt = require("bcrypt");

const registerUser = (firstName, lastName, userName, password, cb) => {
  bcrypt.hash(password, process.env.SALT_ROUNDS, (err, hash) => {
    User.create({ firstName, lastName, userName, password: hash })
      .then(user => {
        cb(null, user);
      })
      .catch(err => {
        cb(err);
      });
  });
};

module.exports = {
  registerUser
};
