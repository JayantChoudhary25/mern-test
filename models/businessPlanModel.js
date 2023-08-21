const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const businessPlanSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "Please Enter Business Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// JWT TOKEN
businessPlanSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id, businessName: this.businessName}, process.env.JWT_SECRET, {
    expiresIn: process.env.INVITE_EXPIRE,
  });
};

module.exports = mongoose.model("BusinessPlan", businessPlanSchema);
