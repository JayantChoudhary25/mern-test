const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emailText :{
    type: String
  }
});

const EmailTemplate = mongoose.model("EmailTemplate", userSchema);

module.exports = EmailTemplate;
