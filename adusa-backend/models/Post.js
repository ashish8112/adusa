const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}], //idempotency
    views:{type:Number,default:0}
},{timestamps:true})

const Post = mongoose.model("Post",postSchema); 
module.exports=Post;

// Registry key = "Post" (exact, case-sensitive) ref: "Post" match from this
// Collection name = "posts" (because Mongoose khud lowercase + pluralize karta hai)