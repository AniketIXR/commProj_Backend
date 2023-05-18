const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth");

// Create a new post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, tags } = req.body;

    const post = new Post({
      name,
      description,
      tags,
      author: req.user.id,
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
