const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncerror");
const InviteUser = require("../models/inviteModel");
const BusinessPlan = require("../models/businessPlanModel")
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const validator = require("validator");
const aws = require('aws-sdk');
const stream = require('stream');

// S3 bucket 
aws.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: '',
});
const s3 = new aws.S3();

const isEmailValid = (email) => {
  return validator.isEmail(email);
};

// temp for test send email with business plane token with _id and businessName 
exports.sendInvite = catchAsyncErrors(async (req, res, next) => {
  const { email, businessName } = req.body;
    //  const { email } = req.body;

  const validEmail = isEmailValid(email);

  if (!validEmail) {
    return res.status(400).json({ message: "Enter Valid Mail" });
  }

  const businessPlan = await BusinessPlan.findOne({ businessName: businessName });

  if (!businessPlan) {
    return res.status(404).json({ message: "Business plan not found" });
  }

  // const token = businessPlan.getJWTToken();

  const url = `http://localhost:3000/`;
  // const url = `http://localhost:3000/${token}`;

  const mailOptions = {
    to: email,
    subject: "Invitation to Join the Michael Pricharda Portal",
    text: `
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #ac3636;
                color: white;
                text-align: center;
                padding: 10px 0;
                border-radius: 10px 10px 0 0;
            }
            .content {
                background-color: white;
                padding: 20px;
                border-radius: 0 0 10px 10px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: inline-block;
                padding: 11px 20px;
                background-color: #ac3636;
                color: white !important;
                text-decoration: none;
                border-radius: 20px;
                width: 150px;
                text-align: center;
                font-size: 15px;
                font-weight: 500;
                white-space: nowrap;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Welcome to Michael Pricharda</h2>
            </div>
            <div class="content">
                <h3>Hi ${email}!</h3>
                <p>Congratulations and welcome to Michael Pricharda ! You now have access to Michael Pricharda Business Products.</p>
                <p><strong>User Email:</strong> ${email}</p>
                <p><strong>Business Plan:</strong> PRIME Plan</p>
                <p>Please click to accept the NDA Agreement:</p>
                <p><a href="${url}" class="button">Go to Agreement</a></p>
            </div>
        </div>
    </body>
    </html>
        `,
  };

  await InviteUser.create({
    email,
    businessName
  });

  try {
    await sendEmail(mailOptions);
    console.log("Invitation email sent");
    return res
      .status(200)
      .json({ message: "Invitation email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send invitation email" });
  }
});

exports.agreementStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const { ndaStatus, email } = req.body;
    // const { ndaStatus, email, pdfBase64Data } = req.body;

    const user = await InviteUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload the PDF to S3
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(pdfBase64Data, 'base64'));

    const params = {
      Bucket: '',
      Key: `pdfs/${email}-${Date.now()}.pdf`,
      Body: bufferStream,
    };

    const uploadResult = await s3.upload(params).promise();

    user.pdf_url = uploadResult.Location;
    user.ndaStatus = ndaStatus;

    await user.save();

    return res
      .status(200)
      .json({ message: 'NDA status and PDF URL updated successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
    
exports.inviteUser = catchAsyncErrors(async (req, res, next)=> {
  // const {email, businessName, Accesskey} = req.body;
  const {email, _id} = req.body;

  let user = await InviteUser.findById(_id);

  const randomAccessCode = crypto.randomBytes(3).toString("hex").toUpperCase();

  user.Accesskey = randomAccessCode;

  await user.save();
  
  const url = `http://localhost:3000/`;

  const mailOptions = {
    to: email,
    subject: `Access Code for your ${user.businessName} Plan`,
    text: `
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #ac3636;
                color: white;
                text-align: center;
                padding: 10px 0;
                border-radius: 10px 10px 0 0;
            }
            .content {
                background-color: white;
                padding: 20px;
                border-radius: 0 0 10px 10px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: inline-block;
                padding: 11px 20px;
                background-color: #ac3636;
                color: white !important;
                text-decoration: none;
                border-radius: 20px;
                width: 150px;
                text-align: center;
                font-size: 15px;
                font-weight: 500;
                white-space: nowrap;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Welcome to Michael Pricharda</h2>
            </div>
            <div class="content">
                <h3>Hi ${email}!</h3>
                <p>Congratulations and welcome to Michael Pricharda !</p>
                <p><strong>Business Plan:</strong> ${user.businessName} Plan</p>
                <p>Your access code for the selected plan is: ${randomAccessCode}</p>
                <p>Please click to access your Plan:</p>
                <p><a href="${url}" class="button">Go to Plan</a></p>
            </div>
        </div>
    </body>
    </html>
        `,
  };

  try {
    await sendEmail(mailOptions);
    console.log("Email sent");
    return res
      .status(200)
      .json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

exports.userTrueNDA = catchAsyncErrors(async (req, res, next)=> {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const totalUsers = await InviteUser.countDocuments({
    ndaStatus: true,
    Accesskey: { $exists: false },
  });

  const totalPages = Math.ceil(totalUsers / limit);

  const skip = (page - 1) * limit;

  const Users = await InviteUser.find(
    {
      ndaStatus: true,
      Accesskey: { $exists: false },
    },
    { __v: 0 }
  )
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    Users,
    page,
    totalPages,
    totalUsers,
  });
});

exports.userFalseNDA = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const totalUsers = await InviteUser.countDocuments({ ndaStatus: false });

  const totalPages = Math.ceil(totalUsers / limit);

  const skip = (page - 1) * limit;

  const Users = await InviteUser.find(
    { ndaStatus: false },
    { __v: 0 }
  )
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    Users,
    page,
    totalPages,
    totalUsers,
  });
});

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1 
    const limit = parseInt(req.query.limit) || 10; // Number of users per page, defaults to 10 
  
    const totalUsers = await InviteUser.countDocuments(); 
  
    const totalPages = Math.ceil(totalUsers / limit);
  
    const skip = (page - 1) * limit;
  
    const data = await InviteUser.find({}, { __v: 0 }).skip(skip).limit(limit);
  
    return res.status(200).json({
      data,
      page,
      totalPages,
      totalUsers,
    });
});

exports.subscribedUser = catchAsyncErrors(async (req, res, next) =>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const totalUsers = await InviteUser.countDocuments({
    ndaStatus: true,
    Accesskey: { $exists: true }, // Only select users with Accesskey
  });

  const totalPages = Math.ceil(totalUsers / limit);

  const skip = (page - 1) * limit;

  const users = await InviteUser.find(
    {
      ndaStatus: true,
      Accesskey: { $exists: true }, // Only select users with Accesskey
    },
    { __v: 0 }
  )
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    users,
    page,
    totalPages,
    totalUsers,
  });
})