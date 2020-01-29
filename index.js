require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const User = require("./routes/user");
const Book = require("./routes/book");
const BookNote = require("./routes/book_notes");
const passport = require("./passport");
const port = process.env.PORT || 3000;

const options = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 259200000 },
    store: sessionStore
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//basic auth routes
app.use(express.static("public"));

app.use("/api", User);
app.use("/api", Book);
app.use("/api", BookNote);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Server listening on port ${port}`)
);
