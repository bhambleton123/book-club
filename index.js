require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./controllers/user");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

//basic auth routes
app.post("/api/register", User.registerUser);

app.listen(port, () => console.log(`Server listening on port ${port}`));
