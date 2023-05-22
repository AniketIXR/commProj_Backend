const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const {login} =- require('../controller/authController');

const jwtSecret = "abcdef";

router.post(
  "/Login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  login
);
module.exports = router;
