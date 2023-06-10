const { catchAsync } = require("../Utils/catchAsync");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { OAuth2Client } = require("google-auth-library");

// const signToken = (data) => {
//   return jwt.sign(data, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

exports.login = catchAsync(async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Invalid data", 400));
  }

  const { email, googleId } = req.body;
  const user = await User.findOne({ email: email, googleId: googleId });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "user does not exist",
    });
  }

  const tokenData = {
    email: user.email,
    googleId: user.googleId,
  };

  const jwt = signToken(tokenData);

  res.status(201).json({
    success: true,
    user,
    jwt,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError());
  }

  const existingUser = await User.findOne({ googleId: req.body.googleData.id });

  if (!existingUser) {
    const newUser = new User({
      fullName: req.body.googleData.name,
      batch: req.body.batch,
      branch: req.body.branch,
      dateJoined: new Date(),
      photo: req.body.googleData.picture,
      email: req.body.googleData.email,
      googleId: req.body.googleData.id,
      joinedCommunities: [],
      createdPosts: [],
      contributionScore: 0,
    });

    await newUser.save();
    console.log(newUser);
    console.log("New user created successfully");

    const tokenData = {
      email: newUser.email,
      googleId: newUser.googleId,
    };

    const jwt = signToken(tokenData);

    res.status(201).json({
      success: true,
      jwt,
      user: newUser,
    });
  } else {
    const tokenData = {
      email: existingUser.email,
      googleId: existingUser.googleId,
    };

    const jwt = signToken(tokenData);

    res.status(201).json({
      success: true,
      jwt,
      user: existingUser,
    });
  }
});

// exports.protect = catchAsync(async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return next(
//       new AppError("You are not logged in! Please login to get access", 401)
//     );
//   }

//   const decode = promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findOne({ name: decode.data.email });
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token does not exist", 401)
//     );
//   }
//   next();
// });

// exports.googlesignin = catchAsync(async (req, res, next) => {
//   const client = new OAuth2Client(process.env.CLIENT_ID);
//   const { token } = req.body;

//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });

//   const { name, email, password, image } = ticket.getPayload();

//   const user = await User.findOne({ email });
//   if (!user) {
//     user = new User({
//       name,
//       email,
//       password,
//       image,
//     });
//     await user.save();
//   }

//   const data = {
//     email: user.email,
//     password: user.password,
//   };

//   const authToken = signToken(data);

//   res.cookie("token", authToken, {
//     httpOnly: true,
//     secure: true,
//   });

//   res.json({ success: true });
// });

// exports.signup = catchAsync(async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new AppError());
//   }

//   const salt = await bcrypt.genSalt(10);
//   let secPassword = await bcrypt.hash(req.body.password, salt);

//   const newUser = new User({
//     name: req.body.fullName,
//     email: req.body.email,
//     password: secPassword,
//     image: req.body.image,
//   });

//   await newUser.save();
//   console.log(newUser);
//   console.log("New user created successfully");

//   const data = {
//     email: newUser.email,
//     password: newUser.password,
//   };

//   const token = signToken(data);

//   res.status(201).json({
//     status: "Success",
//     token,
//     data: {
//       user: newUser,
//     },
//   });
// });
