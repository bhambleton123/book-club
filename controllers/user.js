const models = require("../models/user");

const registerUser = (req, res) => {
  models.registerUser(
    req.body.firstName,
    req.body.lastName,
    req.body.password,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    }
  );
};

module.exports = {
  registerUser
};
