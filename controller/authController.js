const {catchAsync} = require('../Utils/catchAsync');
const User = require('../models/userModel');
const { validationResult } = require("express-validator");
const AppError = require('../Utils/appError');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} = require('util');

const signToken = data => {
    return token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN,
     });
}

exports.login =catchAsync(
    async (req, res,next) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new AppError('Invalid data',400)); 
        }
    
        const { email, password } = req.body;
          let user = await User.findOne({ email });
          if (!user) {
            return next(new AppError("Try Logging in with correct credentials",400)); 
          }
    
          const pwdCompare = await bcrypt.compare(password, user.password);
          if (!pwdCompare) {
            return next(new AppError("Try Logging in with correct credentials",400))    
        }

        const data = {
            email: user.email,
            password: user.password
        }

          success = true;
          const authToken = jwt.signToken(data);
          
          res.cookie('token', authToken, {
            httpOnly: true,
            secure: true,
          });
        
          res.json({success});
      }
); 

exports.signup = catchAsync(
    async (req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new AppError());
        }
    
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            proImage: req.body.proImage,
            creationTime: req.body.creationTime,
          });
    
          await newUser.save()
        console.log(newUser);
        console.log("New user created successfully");

        const data = {
            email: newUser.email,
            password: newUser.password
        }

    const token = signToken(data);

     res.status(201).json({
        status:"Success",
        token,
        data:{
            user:newUser,
        }
     });     
        
      }
);

exports.protect = catchAsync(
    async (req, res,next) => {
        const token = req.cookies.token;
        
        if(!token)
        {
            return next(new AppError('You are not loged in! Please login to get access',401));
        }

        const decode =promisify(jwt.verify)(token,process.env.JWT_SECRET);

        const currentUser = await User.findOne({name:decode.data.email});
        if(!currentUser)
        {
            return next(new AppError('The user belonging to this token does not exist',401));
        }
        next();
    }
);