require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./controllers/user");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static("public"));
//basic auth routes
app.post("/api/register", User.registerUser);

app.listen(port, () => console.log(`Server listening on port ${port}`));
