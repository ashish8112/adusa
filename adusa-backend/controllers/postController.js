const Post = require("../models/Post");

const createPost = async(req,res)=>{
    try{
        let {content} = req.body;
        if(typeof content!=="string")
            return res.status(400).json({message:"Content must be text"});
        content = content.trim();
        if(!content)
            return res.status(400).json({message:"Cannot create post with empty content"})
        const oneHourBefore = new Date(Date.now()-60*60*1000); // new Date() current time in human readable format and Date.now() only number from 1 Jan 1970 midnight perhaps , we are calculating inside for one before and creating Date object for that specific time 
        const recentPosts = await Post.countDocuments({author:req.user.id,createdAt:{$gte:oneHourBefore}}) //gte = greate than or equall to and mongoDb has BSON Date type which also stores in milliseconds so it requires milliseconds not string like ISO String "2026-08-01T10:00:00Z"
        if(recentPosts>=5) // rate limiting users to post 5 post only in an hour 
            return res.status(429).json({message:"Too many posts. Try again later. "});
        const post =  new Post({content,author:req.user.id});
        await post.save();
        await post.populate("author","name bio")
        res.status(201).json({message:"Post Created",post});
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

const getFeed = async(req,res)=>{
    try{
        const page = Number(req.query.page)||1;
        const limit =5;
        const skip = (page-1)*limit;
        const posts = await Post.find({}).sort({createdAt:-1}).skip(skip).limit(limit).populate("author", "name bio");
        const total = await Post.countDocuments({});
        return res.status(200).json({posts,page,total,hasMore:skip+posts.length<total});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const toggleLike = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"No post exists"});
        let updatedPost;
        const alreadyLiked = post.likes.some((id)=>(id.toString()===req.user.id))
        if(alreadyLiked)
            updatedPost=await Post.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user.id}},{new:true})
        else
            updatedPost = await Post.findByIdAndUpdate(req.params.id,{$addToSet:{likes:req.user.id}},{new:true})
        res.status(200).json({liked:!alreadyLiked,likes:updatedPost.likes})
    }   
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

const checkLike = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({message:"No post exists"});
        const liked = post.likes.some((id)=>(id.toString()===req.user.id));
        return res.status(200).json({liked});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports={createPost,getFeed,toggleLike,checkLike};