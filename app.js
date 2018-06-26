// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to MongoDB (stored in config file)
mongoose.connect(config.database);

// On database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});

// On database error
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

// Initialise Express
const app = express();

// Bring in the users folder from the routes folder
const users = require("./routes/users");

// Port number
const port = process.env.PORT || 8080;

// CORS Middleware that allows API requests from a different domain name
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Body-Parser Middleware that parses incoming request bodies
app.use(bodyParser.json());

// Passport Middlewware for tokens
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User users for all user routes
app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint for now");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});

//"dist/angular-src",