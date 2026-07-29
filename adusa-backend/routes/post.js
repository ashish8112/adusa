const Post = require("../models/Post");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")

router.post("/",verifyToken,async(req,res)=>{
    try{
        let {content} = req.body;
        if(typeof content!=="string")
            return res.status(400).json({message:"Content must be text"});
        content = content.trim();
        if(!content)
            return res.status(400).json({message:"Cannot create post with empty content"})
        const post =  new Post({content,author:req.user.id});
        await post.save();
        res.status(201).json({message:"Post Created",post});
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.get("/",async(req,res)=>{
    try{
        const page = Number(req.query.page)||1;
        const limit =5;
        const skip = (page-1)*limit;
        const posts = await Post.find({}).sort({createdAt:-1}).skip(skip).limit(limit).populate("author", "name bio");
        return res.status(200).json(posts);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
})