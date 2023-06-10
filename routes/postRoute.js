const express = require("express");
const router = express.Router();

const { newpost } = require("../controller/postController");

// Create a new post
router.post("/post", newpost);

router.get("/post/:id/comments");

module.exports = router;
