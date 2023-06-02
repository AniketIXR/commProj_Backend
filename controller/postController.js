const AppError = require("../utils/appError");
const { catchAsync } = require("../Utils/catchAsync");
const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const Post = require("../models/postModel");
const { protect } = require("../controller/authController");

exports.newpost = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.substring(7);
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    email: tokenData.email,
    googleId: tokenData.googleId,
  });

  if (!user) {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const postId = uuidv4();

  const { proImage, name, description, tags, time } = req.body;

  const post = new Post({
    proImage,
    name,
    postId: postId,
    description,
    tags,
    time,
  });

  await post.save();

  res.status(201).json({ message: "Post created successfully", post });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({ message: "Post retrieved successfully", post });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  const token = req.headers.authorization.substring(7);
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    email: tokenData.email,
    googleId: tokenData.googleId,
  });

  if (post.author.toString() !== user.googleId) {
    return next(
      new AppError("You are not authorized to update this post", 403)
    );
  }

  post.proImage = req.body.proImage;
  post.name = req.body.name;
  post.description = req.body.description;
  post.tags = req.body.tags;
  post.time = req.body.time;

  await post.save();

  res.status(200).json({ message: "Post updated successfully", post });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  const token = req.headers.authorization.substring(7);
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    email: tokenData.email,
    googleId: tokenData.googleId,
  });

  if (post.author.toString() !== user.googleId) {
    return next(
      new AppError("You are not authorized to delete this post", 403)
    );
  }

  await post.remove();

  res.status(204).json({ message: "Post deleted successfully" });
});
