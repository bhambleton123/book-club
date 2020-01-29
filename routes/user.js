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
    res.end();
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/user", (req, res) => {
  res.send(
    req.user ? { user: { id: req.user.id, userName: req.user.userName } } : null
  );
});

router.post("/user-exists", User.userNameExists);

module.exports = router;
