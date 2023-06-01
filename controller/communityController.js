const { promisify } = require("util");
const Community = require("../models/communityModel");
const User = require("../models/userModel");

exports.createCommunity = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const { name, visibility, allowAnonymity } = req.body;

  const community = await Community.create({
    name: name,
    visibility: visibility,
    allowAnonymity: allowAnonymity,
    memCount: 1,
    owner: decoded.data.email,
  });
  
  res.status(200).json({
    status: "success",
    data: {
      community,
    },
  });
});

exports.createMods = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const { modEmail } = req.body;

  const user = await User.findOne({ email: decoded.data.email });

  if (user.role !== "admin") {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const com = await Community.findOne({
    name: req.params.name,
    owner: decoded.data.email,
  });

  if (!com) {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  com.mods.push(modEmail);
  await com.save();
});

exports.setVisibility = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //const { owneremail } = req.body;

  const user = await User.findOne({ email: decoded.data.email });
  if (user.role !== "admin") {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const com = await Community.findOne({
    name: req.params.name,
    owner: decoded.data.email,
  });

  if (!com) {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const visibility = req.body.visibility;
  com.visiblity = visibility;
  await com.save();

  res.json({ status: success });
});
