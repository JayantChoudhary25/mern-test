const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  invite: {
    type: Boolean,
  },
});

const InvitedUser = mongoose.model("InvitedUser", userSchema);
module.exports = InvitedUser;
