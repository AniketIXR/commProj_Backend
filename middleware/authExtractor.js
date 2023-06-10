const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.substring(7);
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenData);
    const user = await User.findOne({
      email: tokenData.email,
      googleId: tokenData.googleId,
    });
    if (!user) {
      return res.status(401).end();
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(401).end();
  }
};
