const models = require("../models/user");

const registerUser = (req, res) => {
  models.registerUser(
    req.body.firstName,
    req.body.lastName,
    req.body.userName,
    req.body.password,
    (err, response) => {
      if (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.send(err.name);
        }
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    }
  );
};

const userNameExists = (req, res) => {
  models.userNameExists(req.body.userName, (err, exists) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(exists);
  });
};

module.exports = {
  registerUser,
  userNameExists
};
