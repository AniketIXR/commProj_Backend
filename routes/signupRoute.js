const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/signup",
  [
    body("fullName").exists().withMessage("Enter a valid Name"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .exists()
      .isLength({ min: 8 })
      .withMessage("Enter a password with atleast 8 characters"),
  ],
   signup
);

module.exports = router;
