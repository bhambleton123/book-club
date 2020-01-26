const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../database/index").User;
const validatePassword = require("../models/user").validatePassword;

passport.use(
  new localStrategy(
    {
      usernameField: "userName"
    },
    function(userName, password, done) {
      User.findOne({ where: { userName } }).then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        validatePassword(password, user.dataValues.password, (err, res) => {
          if (res) {
            return done(null, user);
          }
          if (err) {
            return done(null, err);
          }
          return done(null, false, { message: "Incorrect password" });
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

module.exports = passport;
