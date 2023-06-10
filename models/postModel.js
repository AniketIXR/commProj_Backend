const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  proImage: {
    type: String,
    reqired: [true, "Image is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 100,
  },
  tags: {
    type: [String],
    default: [],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  comments:{
    type:[String],
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
