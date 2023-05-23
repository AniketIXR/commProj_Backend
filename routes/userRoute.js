const express = require('express');
const  {getAllData,createUser} = require('../controller/userController');
const {login,signup} = require('../controller/authController');
const { body } = require("express-validator");

const router = express.Router();

const app = express();
app.use(express.json());


router.route("/signup").post(
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

  router.route( "/Login").post(
    [
      body("email", "Enter a Valid Email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ],
    login
  );

router.route('/').get(getAllData).post(createUser);

module.exports = router;