const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A name is required"],
  },
  batch: {
    type: Number,
    required: [true, "Batch is required"],
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
  },
  dateJoined: {
    type: Date,
    default: Date.now(),
  },
  photo: {
    type: String,
    reqired: [true, "Image is required"],
  },
  email: {
    type: String,
    reqired: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: [true, "GoogleId id required"],
    unique: true,
  },
  joinedCommunities: {
    type: {
      communityName: {
        type: String,
        required: [true, "A community name is required"],
      },
      memCount: {
        type: Number,
        required: [true, "Count is required"],
        default: 0,
      },
    },
    default: [],
  },
  createdPosts: {},
  contributionScore: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
