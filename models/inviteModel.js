const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const inviteUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  businessName: {
    type: String,
    required: [true, "Please Enter Business Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  Accesskey: {
    type: String
  },
  pdf_url:{
    type: String
  },
  ndaStatus: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// inviteUserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });


// JWT TOKEN
inviteUserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, businessName: this.businessName}, process.env.JWT_SECRET, {
    expiresIn: process.env.INVITE_EXPIRE,
  });
};

// Compare Password
// inviteUserSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Generating Password Reset Token
// inviteUserSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("InvitedUser", inviteUserSchema);
