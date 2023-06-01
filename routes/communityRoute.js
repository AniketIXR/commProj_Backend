const { createCommunity } = require("../controller/communityController");
const express = require("express");

const router = express.Router();

router.route("/create").post(createCommunity);
// router.route('/createMods').patch(createMods);
// router.route('/setVisibility').patch(setVisibility);

module.exports = router;
