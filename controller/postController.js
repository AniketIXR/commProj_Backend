const AppError = require("../Utils/appError");
const { catchAsync } = require("../Utils/catchAsync");

const Post = require("../models/postModel");
const { protect } = require("../controller/authController");

exports.newpost = catchAsync(async (req, res, next) => {
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
