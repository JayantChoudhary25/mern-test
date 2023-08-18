const User = require("../models/User");
const AdminUser = require("../models/Adminuser");
const emailValidator = require("deep-email-validator");
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsyncerror = require("../middleware/catchAsyncerror.js");
const Productselcted = require("../models/Userproduct");
const EmittedMessage = require("../models/EmittedMessage");
const EmailTemplate = require("../models/EmailTemplate");
const socketModule = require("../utils/Socket");
const sendEmail = require("../utils/sendEmail");
const InvitedUser = require("../models/Inviteduser");
const bcrypt = require("bcryptjs");
const CsvParser = require("json2csv").Parser;
const uploadOnS3 = require("../utils/uploadOnS3");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}
// REGISTER //
exports.register = catchAsyncerror(async (req, res) => {
  const { Firstname, lastname, email, password } = req.body;
  if ((!Firstname, !lastname || !email || !password)) {
    return res.status(400).json("plese fill all input ");
  }

  const user = await User.findOne({ email });
  const { valid, reason, validators } = await isEmailValid(email);
  console.log(user);
  const inviteuser = await InvitedUser.find({ email });
  console.log(inviteuser);
  if (!inviteuser) {
    return res.status(500).json("you are not invited");
  } else if (user) {
    return res.status(500).json("user already registered");
  } else if (inviteuser) {
    const user = await User.create({
      Firstname,
      lastname,
      email,
      password,
    });

    const io = socketModule.getIO();
    io.emit("userCreated", {
      message: `${(Firstname, lastname)} created new account`,
    });
    sendToken(user, 201, res);
    console.log(user);
  }

  return;
});

exports.adminregister = catchAsyncerror(async (req, res) => {
  const { Firstname, lastname, email, password } = req.body;

  if (!Firstname || !lastname || !email || !password) {
    return res.status(400).json("Please fill all input");
  }
  const user = await AdminUser.findOne({ email });

  console.log(user);

  if (user) {
    return res.status(500).json("User already registered");
  } else {
    const user = await AdminUser.create({
      Firstname,
      lastname,
      email,
      password,
    });

    sendToken(user, 201, res);
  }
  return;
});

// AUTH //
exports.login = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("Please Enter Email and Password");
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }

    sendToken(user, 200, res);
    
    //   const users = await User.findByIdAndUpdate(
    //     user.id,
    //     { firstlogin: true },
    //     { new: true }
    //   );

    //   const io = socketModule.getIO();
    //   const message = `New User First Login: ${users.Firstname}`;

    //   if (users.firstlogin) {
    //     io.emit('userFirstLogin', { data: message });
    //   }

    // const newMessage = { timestamp: new Date(), message: message };

    // try {
    //   await EmittedMessage.create(newMessage);
    //   console.log('Message saved to database');
    // } catch (error) {
    //   console.error('Error saving message to database:', error);
    // }
    // } catch (error) {
    //   console.log(error);
    // }

    if (!user.firstlogin) {
      // User is logging in for the first time
      const io = socketModule.getIO();
      const message = `New User First Login: ${user.Firstname}`;

      io.emit("userFirstLogin", { data: message });
      const newMessage = { timestamp: new Date(), message: message };

      try {
        await EmittedMessage.create(newMessage);
        console.log("Message saved to database");
      } catch (error) {
        console.log("Error saving message to database:", error);
      }

      // Update the firstlogin status
      await User.findByIdAndUpdate(user.id, { firstlogin: true });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.adminlogin = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("Please Enter Email and Password");
    }

    const user = await AdminUser.findOne({ email }).select("+password");
    if (!user) {
      return res.status(500).json("Invalid credentials user not found");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("Password is not valid please register");
    }
    // res.status(201).json(user)

    sendToken(user, 200, res);
  } catch (error) {
    throw new Error(error);

    // res.status(500).json({ success: false });
  }
});

exports.forgotPassword = catchAsyncerror(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(`${email} this email is not registered`);
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://50.17.174.239/passwordreset/${resetToken}`;

    const message = `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
        }
        .header {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 10px;
            border-top: 1px solid #e0e0e0;
            border-radius: 0 0 5px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Hello ${user.Firstname},</h2>
        </div>
        <div class="content">
            <p>We have received a request to reset your password for your account on <strong>Perswell</strong>. If you did not request this change, you can ignore this email and your password will not be changed.</p>
            
            <p>To reset your password, please click on the following link and follow the instructions:</p>
            
            <p><a class="button" href="${resetUrl}">Reset Password</a></p>
            
            <p>This link will expire in <strong>15 minutes</strong> for security reasons. If you need to reset your password after this time, please make another request.</p>
        </div>
        <div class="footer">
            <h3>Thank you,</h3>
            <h3>Perswell Team</h3>
        </div>
    </div>
</body>
</html>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Account Password Reset Link",
        text: message,
      });
      res.status(200).json({
        success: true,
        data: "EMAIL SENT",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json("Email could not be sent");
    }
  } catch (error) {
    next(error);
  }
});

exports.resetPassword = catchAsyncerror(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json("Invalid Reset Token");
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      status: true,
      data: "Password Reset Successfully",
    });
  } catch (error) {
    next(error);
  }
});

exports.logout = async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  // option for cookie
  const options = {
    expire: new Date(Date.now + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

exports.first_login_users = catchAsyncerror(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const totalUsers = await User.countDocuments({ firstlogin: true });

  const totalPages = Math.ceil(totalUsers / limit);

  const skip = (page - 1) * limit;

  const Users = await User.find(
    { firstlogin: true },
    { __v: 0, product: 0, password: 0, role: 0 }
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

exports.get_all_user = catchAsyncerror(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Number of users per page, defaults to 10 if not specified

  const totalUsers = await User.countDocuments(); // Total number of users

  const totalPages = Math.ceil(totalUsers / limit); // Calculate total number of pages

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const data = await User.find({}, { __v: 0 }).skip(skip).limit(limit);

  return res.status(200).json({
    data,
    page,
    totalPages,
    totalUsers,
  });
});

exports.getuserrDetail = catchAsyncerror(async (req, res, next) => {
  const data = await User.find(
    { firstlogin: true },
    { __v: 0, _id: 0, role: 0, firstlogin: 0, password: 0 }
  );
  return res.status(200).json(data);
});

// isAuth user
exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if (req.user === null) {
      req.user = await AdminUser.findById(decodedData.id);
    }
    next();
  }
});

// auth role
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.json(
          `Role: ${req.user.role} is not allowed  to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// PRODUCT //
exports.get_product_activity = catchAsyncerror(async (req, res, next) => {
  const data = await Productselcted.find({}, { __v: 0, _id: 0 });
  return res.status(200).json(data);
});

exports.dashboard = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  }

  let user = await User.findById(req.user.id);
  if (user === null) {
    user = await AdminUser.findById(req.user.id);
  }

  const products = await Productselcted.find({ user: user.id });

  res.status(200).json({ sucess: true, user, products });
});

exports.selectproduct = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Please Login to access this resource", status: false });
  }
  let user = await User.findById(req.user.id);
  const { product } = req.body;

  const selectedProduct = await Productselcted.findOne({ Product: product });

  if (!selectedProduct) {
    return res
      .status(404)
      .json({ message: "Product not found", status: false });
  }

  // Retrieve the productImage from the found product in Productselcted
  const productImage = selectedProduct.image;
  const productDescription = selectedProduct.description;

  // Update the productImage and product fields in the User table
  user.productImage = productImage;
  user.product = product;
  user.description = productDescription;

  // Generate a random access code of length 6
  const randomAccessCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  user.accessCode = randomAccessCode;

  await user.save();

  const io = socketModule.getIO();

  const message = `${user.Firstname} selected ${product}`;
  io.emit("selectproduct", { data: message });


  const newMessage = { timestamp: new Date(), message: message };

  try {
    await EmittedMessage.create(newMessage);
    console.log('Message saved to database');
  } catch (error) {
    console.error('Error saving message to database:', error);
  }

  // io.emit("selectproduct", { data: `${user.email} selected ${product}`
    // data: {
    //   message: `${user.email} selected ${product}`,
    //   userId: user._id,
    //   userEmail: user.email,
    //   product: product,
    //   accessCode: randomAccessCode,
    // },
  // });

  res.status(200).json({
    success: true,
    message:
      "Thank you for making your selection. Your subscription access code will be sent to your work email. Enjoy!",
  });
});

exports.clearMessages = catchAsyncerror(async (req, res) => {
  try {
    await EmittedMessage.deleteMany({});

    res.status(200).json({ success: true, message: 'Messages cleared successfully' });
  } catch (error) {
    console.log('Error clearing messages:', error);
    res.status(500).json({ success: false, message: 'Failed to clear messages' });
  }
});

exports.getMessages = catchAsyncerror(async (req, res, next) => {
  try {
    const messages = await EmittedMessage.find({});

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({ error: "No Message", error });
  }
});

exports.add_product = catchAsyncerror(async (req, res, next) => {
  const product = await Productselcted.create({
    image: req.body.image,
    Product: req.body.Product,
    title: req.body.title,
    description: req.body.description,
  });

  return res.status(200).json({ product });
});

exports.update_product = catchAsyncerror(async (req, res, next) => {
  const { image, Product, title, description, _id } = req.body;
  try {
    const product = await Productselcted.findByIdAndUpdate(
      { _id },
      {
        image,
        Product,
        title,
        description,
      }
    );
    return res.status(200).json({ msg: "Product Updated", product });
  } catch (error) {
    next(error);
  }
});

exports.delete_product = catchAsyncerror(async (req, res, next) => {
  const productId = req.body.id;

  const product = await Productselcted.findById(productId);
  console.log(product);
  if (product) {
    await Productselcted.findByIdAndDelete({ _id: productId });
    return res.status(200).json({ message: "Product deleted successfully" });
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

exports.get_all_products = catchAsyncerror(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const products = await Productselcted.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  if (products.length > 0) {
    const totalProducts = await Productselcted.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      products,
      page,
      totalPages,
      totalProducts,
    });
  } else {
    return res.json({ error: "No products found." });
  }
});

// INVITE USER //
exports.singleInvite = catchAsyncerror(async (req, res, next) => {
  const { email, Firstname, lastname } = req.body;

  let passwords = generateInvitationCode();
  // const emailTemplate = await EmailTemplate.findOne();

  const url = 'http://50.17.174.239/'

  const mailOptions = {
    to: email,
    subject: "Invitation to Join the Member Portal",
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
            <h2>Welcome to Perswell</h2>
        </div>
        <div class="content">
            <h3>Hi ${Firstname}!</h3>
            <p>Congratulations and welcome to Perswell! You and your team now have access to Perswell Products. Please log in today to activate your account.</p>
            <h3>Login Credentials:</h3>
            <p><strong>User Name:</strong> ${email}</p>
            <p><strong>Password:</strong> ${passwords}</p>
            <p>Click below to login to your account:</p>
            <p><a href="${url}" class="button">Activate Your Account</a></p>
        </div>
    </div>
</body>
</html>
    `,
  };

  const user = await InvitedUser.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Invitation already sent" });
  }

  try {
    sendEmail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res
          .status(500)
          .json({ error: "Failed to send invitation email" });
      }
      console.log("Invitation email sent:", info.response);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send invitation email" });
  }
  await InvitedUser.create({
    Firstname,
    lastname,
    email,
    password: passwords,
    invite: true,
  }).then(async () => {
    const user = await User.create({
      Firstname,
      lastname,
      email,
      password: passwords,
    });
  });

  return res
    .status(200)
    .json({ message: "Invitation email sent successfully" });
});

exports.inviteuser = catchAsyncerror(async (req, res, next) => {
  const { users } = req.body;

  const invitationsSent = [];
  let successStatus = 200;

  for (const user of users) {
    const { email, Firstname, lastname } = user;

    const existingInvitedUser = await InvitedUser.findOne({ email });

    if (existingInvitedUser) {
      invitationsSent.push({ email, status: "invitation already sent" });
      successStatus = 400;
      continue;
    }

    let passwords = generateInvitationCode();

    // const emailTemplate = await EmailTemplate.findOne();

    const url = 'http://50.17.174.239/'

    const mailOptions = {
      to: email,
      subject: "Invitation to Join the Member Portal",
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
            <h2>Welcome to Perswell</h2>
        </div>
        <div class="content">
            <h3>Hi ${Firstname}!</h3>
            <p>Congratulations and welcome to Perswell! You and your team now have access to Perswell Products. Please log in today to activate your account.</p>
            <h3>Login Credentials:</h3>
            <p><strong>User Name:</strong> ${email}</p>
            <p><strong>Password:</strong> ${passwords}</p>
            <p>Click below to login to your account:</p>
            <p><a href="${url}" class="button">Activate Your Account</a></p>
        </div>
    </div>
</body>
</html>
      `,
    };

    try {
      sendEmail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          invitationsSent.push({ email, status: "failed to send invitation" });
          successStatus = 400;
        } else {
          console.log("Invitation email sent:", info.response);
          invitationsSent.push({
            email,
            status: "invitation sent successfully",
          });
        }
      });

      await InvitedUser.create({
        Firstname,
        lastname,
        email,
        password: passwords,
        invite: true,
      });

      await User.create({
        Firstname,
        lastname,
        email,
        password: passwords,
      });
    } catch (error) {
      console.log(error);
      invitationsSent.push({ email, status: "failed to send invitation" });
      successStatus = 400;
    }
  }
  return res.status(successStatus).json({ invitations: invitationsSent });
});

exports.emailTemplate = catchAsyncerror(async (req, res, next) => {
  const { emailText } = req.body;

  const updatedTemplate = await EmailTemplate.updateOne({}, { emailText });

  return res
    .status(200)
    .json({ msg: "Email Template Updated", result: updatedTemplate });
});

exports.invitation_list = catchAsyncerror(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Number of invited users per page, defaults to 10 if not specified

  const totalInvitedUsers = await InvitedUser.countDocuments(); // Total number of invited users

  const totalPages = Math.ceil(totalInvitedUsers / limit); // Calculate total number of pages

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const invitedUsers = await InvitedUser.find({}, { __v: 0 }) // Exclude __v field
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    invitedUsers,
    page,
    totalPages,
    totalInvitedUsers,
  });
});

exports.subscription_list = catchAsyncerror(async (req, res, next) => {
  const product = req.user.product;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const users = await User.find(
    { product: { $exists: true } },
    { __v: 0, password: 0, role: 0, firstlogin: 0 }
  )
    .skip((page - 1) * limit)
    .limit(limit);

  if (users.length > 0) {
    const totalUsers = await User.countDocuments({
      product: { $exists: true },
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      users,
      page,
      totalPages,
      totalUsers,
    });
  } else {
    return res.json({ error: "No users found." });
  }
});

function generateInvitationCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// UPLOAD API //
exports.uploadImage = catchAsyncerror(async (req, res, next) => {
  if (!req.body || !req.body.content || !req.body.fileName) {
    return res.status(400).json({ error: "Invalid request" });
  }

  let content = req.body.content;
  let fileName = req.body.fileName;

  const decodedImage = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ""),"base64");
  const imgData = new Uint8Array(decodedImage);

  let url = await uploadOnS3(imgData, fileName);
  console.log("URL:", url);
  return res.status(200).json({ status: true, url: url });
});

// EXPORT USER LIST EXCEL //
exports.exportUser = catchAsyncerror(async (req, res, next) => {
  try {
    let users = [];

    var invitationData = await InvitedUser.find({});

    invitationData.forEach((user) => {
      const { Firstname, lastname, email, password } = user;
      users.push({ Firstname, lastname, email, password });
    });
    const fields = ["Firstname", "lastname", "email", "password"];
    const csvParser = new CsvParser({ fields });
    const data = csvParser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment: filename=UsersData.csv");

    res.status(200).end(data);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
});

exports.exportSubscription = catchAsyncerror(async (req, res, next) => {
  try {
    const userId = req.params._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found', status: false });
    }

    const userData = {
      Firstname: user.Firstname,
      lastname: user.lastname,
      email: user.email,
      product: user.product,
      description: user.description,
    };

    const fields = ["Firstname", "lastname", "email", "product", "description"];
    const csvParser = new CsvParser({ fields });
    const csvData = csvParser.parse([userData]);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=Subscription.csv");

    res.status(200).send(csvData);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: false });
  }
});

// GRAPHS API //
exports.monthlyUserCount = catchAsyncerror(async (req, res, next) => {
  try {
    const monthlyCounts = await User.aggregate([
      {
        $match: {
          createdAt: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // const result = monthlyCounts.map(item => ({
    //   year: item._id.year,
    //   month: months[item._id.month - 1],
    //   totalUsers: item.count,
    // }));

    const result = [];

    // Initialize an object with counts set to 0 for all months
    for (let i = 0; i < 12; i++) {
      result.push({
        year: new Date().getFullYear(),
        Month: months[i],
        TotalUsers: 0,
      });
    }

    monthlyCounts.forEach((item) => {
      const index = item._id.month - 1;
      result[index].year = item._id.year;
      result[index].TotalUsers = item.count;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching monthly user counts:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.userSelectedProducts = catchAsyncerror(async (req, res, next) => {
  const products = [
    "Personal Growth",
    "Physical Fitness",
    "Mental Health",
    "Healthy Lifestyle",
    "Parenthood",
  ];

  const productCounts = [];

  for (const product of products) {
    const count = await User.countDocuments({ product: product });
    productCounts.push({ Product: product, Users: count });
  }

  return res.status(200).json(productCounts);
});

exports.userWithoutSelectedProducts = catchAsyncerror(async (req, res, next) => {
    const usersWithoutProductsCount = await User.countDocuments({ product: { $exists: false } });
    const usersWithProducts = await User.countDocuments({ product: { $exists: true } });
    const totalUsers = await User.countDocuments();

    const usersWithoutProductsPercentage = ((usersWithoutProductsCount / totalUsers) * 100 ).toFixed(2);
    const usersWithProductsPercentage = ((usersWithProducts / totalUsers) * 100 ).toFixed(2);

    const response = [
      { Users: "Users_without_product", value: usersWithoutProductsCount },
      { Users: "Users_with_Product", value:  usersWithProducts},
      // { Users: "totalUsers", value: totalUsers },
    ];

    return res.status(200).json(response);
  }
);
