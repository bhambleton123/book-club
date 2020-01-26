require("dotenv").config();
const User = require("../database").User;
const bcrypt = require("bcrypt");

const registerUser = (firstName, lastName, userName, password, cb) => {
  bcrypt
    .hash(password, Number(process.env.SALT_ROUNDS))
    .then(hash => {
      console.log(hash);
      User.create({ firstName, lastName, userName, password: hash })
        .then(user => {
          cb(null, user);
        })
        .catch(err => {
          cb(err);
        });
    })
    .catch(err => {
      cb(err);
    });
};

module.exports = {
  registerUser
};
