const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A name is required'],
        unique:true,
    },
    visibility:{
        type:String,
        enum:['public','restricted'],
        default:'public',
    },
    allowAnonymity:{
        type:Boolean,
        default:false,
    },
    memCount:{
        type:Number,
        required:[true,'A member count is required'],
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'A owner is required'],
    },
    mods:{
        type:[mongoose.Schema.ObjectId],
        ref:'User',
        default:[],
    }
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;