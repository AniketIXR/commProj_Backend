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
  },
  batch:{
    type:String,
    required: [true,"Batch is required"]
  },
  branch:{
    type:String,
    required: [true,"Branch is required"]
  },
  joinedCommunity:{
    type:{
      communityName:{
        type:String,
        required:[true,'A community name is required']
      },
      memCount:{
        type:Number,
        required:[true,'Count is required'],
        default:0,
      }
    }
  },
  karma:{
    type:Number,
    default:0,
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
