const AppError = require("../Utils/appError");
const { catchAsync } = require("../Utils/catchAsync");
const User = require("../models/userModel");
const { promisify } = require("util");

const Post = require("../models/postModel");
const { protect } = require("../controller/authController");

exports.newpost = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findOne({ email: decoded.data.email });

  if (!user) {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const { proImage, name, description, tags, time } = req.body;

  const post = new Post({
    proImage,
    name,
    description,
    tags,
    time,
  });

  await post.save();

  res.status(201).json({ message: "Post created successfully", post });
});