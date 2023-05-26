const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A name is required"],
    unique: true,
  },
  email: {
    type: String,
    reqired: [true, "Email is required"],
    lowercase: true,
    unique: true,
    // validate: {
    //   validator: function (value) {
    //     return "/.+@.+..+/".test(value);
    //   },
    //   message: "Invalid email address",
    // },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  proImage: {
    type: String,
    reqired: [true, "Image is required"],
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

const USER = mongoose.model("USER", userSchema);
module.exports = USER;
