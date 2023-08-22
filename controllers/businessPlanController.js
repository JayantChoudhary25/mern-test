const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerror");
const BusinessPlan = require("../models/businessPlanModel");

// Add Business Plan (Admin)
exports.addBusinessPlan = catchAsyncErrors(async (req, res, next) => {
  const { businessName } = req.body;
  if (!businessName) {
    return res.status(400).json("Please fill Business Name");
  }

  const business = await BusinessPlan.findOne({ businessName });

  if (business) {
    return res.status(500).json("Business Name already registered");
  } else {
    const plan = await BusinessPlan.create({ businessName });
    return res.status(201).json(plan);
  }
});

// Get Single Business Plan Detail (Admin)
exports.getBusinessPlan = catchAsyncErrors(async (req, res, next) => {
  const plan = await BusinessPlan.findById(req.body._id);

  res.status(200).json({
    success: true,
    plan,
  });
});

// Get all Business Plan (Admin)
exports.getAllBusinessPlan  = catchAsyncErrors(async (req, res, next) => {
  const plans = await BusinessPlan.find();

  res.status(200).json({
    success: true,
    plans,
  });
});

// update BusinessPlan  (Admin)
exports.updateBusinessPlan = catchAsyncErrors(async (req, res, next) => {
  const newUserData = { businessName };

  await BusinessPlan.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete BusinessPlan (Admin)
exports.deleteBusinessPlan = catchAsyncErrors(async (req, res, next) => {
  const user = await BusinessPlan.findById(req.body.id);

  if (!user) {
    return next(
      new ErrorHander(`BusinessPlan does not exist with Id: ${req.body.id}`, 400)
    );
  }
  
  await user.remove();

  res.status(200).json({
    success: true,
    message: "BusinessPlan Deleted Successfully",
  });
});
