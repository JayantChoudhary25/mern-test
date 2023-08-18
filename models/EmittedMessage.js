const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const EmittedMessage = mongoose.model("EmittedMessage", userSchema);
module.exports = EmittedMessage;
