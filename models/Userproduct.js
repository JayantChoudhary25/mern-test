const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  email: {
    type: String,
  },
  Product: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Productselcted = mongoose.model("Productselcted", UserSchema);
module.exports = Productselcted;
