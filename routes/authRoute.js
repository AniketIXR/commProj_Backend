const express = require("express");
const { login, signup } = require("../controller/authController");
const { body } = require("express-validator");

const router = express.Router();

const app = express();
app.use(express.json());

router
  .route("/signup")
  .post(
    [
      body("batch").exists().withMessage("Batch not defined"),
      body("branch").exists().withMessage("Branch not defined"),
      body("googleData").exists().withMessage("Google Account Data not defined")
    ],
    signup
  );

router
  .route("/login")
  .post(
    [
      body("email").isEmail(),
      body("googleId").exists(),
    ],
    login
  );

module.exports = router;
