const express = require("express");
const router = express.Router();
const passport = require("../passport");
const User = require("../controllers/user");

router.post("/register", User.registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.send();
  }
);

module.exports = router;
