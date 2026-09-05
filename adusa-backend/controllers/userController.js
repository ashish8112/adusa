const User = require("../models/User"); 
const Post = require("../models/Post");


const getProfileById = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("name bio avatar college");
        if(!user)
            return res.status(404).json({message:"User doesn't exist"});
        const posts = await Post.find({author:id}).sort({createdAt:-1}).populate("author", "name avatar").lean();
        const postsWithLiked = posts.map((post)=>{
            return {...post,liked: req.user ? post.likes.some((id)=>id.toString()===req.user.id) : false}
        })
        return res.status(200).json({user,posts:postsWithLiked});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const updateUserById = async(req,res)=>{
    try{
        const id = req.user.id;
        const allowed = ["bio","college","avatar"];
        const updates = {};

        allowed.forEach((key)=>{
            if(req.body?.[key]!==undefined)
                updates[key]= req.body?.[key]; // square bracket check value with variable also known as computed property
        })

        if(Object.keys(updates).length === 0)
            return res.status(400).json({message:"No valid fields provided for update"})

        const user = await User.findByIdAndUpdate(id,updates,{new:true}).select("name bio avatar college");//search and update already why new because it return new updated document so if we want can use in frontend without again new api call for user details

        if(!user)
            return res.status(404).json({message:"User not found "});

        return res.status(200).json({message:"User updated Successfully",user})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

const deleteUserById = async(req,res)=>{
    try{
        const id = req.user.id;
        const user= await User.findByIdAndDelete(id);//In findById no need to send as object. 
        if(!user)
            return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

module.exports = {getProfileById,updateUserById,deleteUserById};