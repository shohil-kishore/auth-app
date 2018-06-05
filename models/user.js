const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = reuqire("../models/database");

// User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function() {};
