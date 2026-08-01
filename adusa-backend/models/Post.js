const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}], //idempotency , we can write likes: [mongoose.Schema.Types.ObjectId] but we need extra option so wrapped in object 
    views:{type:Number,default:0}
},{timestamps:true})

const Post = mongoose.model("Post",postSchema); 
module.exports=Post;

// Registry key = "Post" (exact, case-sensitive) ref: "Post" match from this
// Collection name = "posts" (because Mongoose khud lowercase + pluralize karta hai)