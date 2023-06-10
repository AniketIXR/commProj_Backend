const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId:{
        type: String,
        required:[true,"A id is required"],
    },
    userEmail:{
        type:String,
        required:[true,"A user is required"],
    },
    body:{
        type: String,
        required: [true,"A description is required"]
    },
    postId:{
        type: String,
        required: [true,"A postId is required"]
    },
    parentId:{
        type:String,
    },
    childIds:{
        type:[String]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }

});

const Comment=mongoose.model('Comment',commentSchema);

module.exports = Comment;
