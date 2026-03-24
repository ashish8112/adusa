const express = require ("express");
const router = express.Router();
const User = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

router.post("/register",async (req,res)=>{
    try{
    const {name,email,password} = req.body; //destructing in key of name,email and password.
    const existingUser = await User.findOne({email});       // email : "abc@1234",
    if(existingUser){
        return res.status(400).json({message:"Email is already Registerd"});
    }
    // await new User({name,email,password}).save();    Decrease Readability.
    const hashedPassword = await bcrypt.hash(password,10); 
    const user = new User ({name,email,password:hashedPassword});
    await user.save();  //saving document (row) int collection (table).
    res.status(201).json({message: "User Registerd"});      //201 Created
    }
    catch (err)
    {
        res.status(500).json({error:err.message});
    }
});

router.get("/users",async(req,res)=>{
    try{
         const users = await User.find({});
        res.json({users});
    }
    catch(err)
    {
      res.status(500).json({error:err.message});  
    }
})

router.get("/users/:id",verifyToken,async(req,res)=>{
    try{
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user)
    return res.status(404).json({message:"User doesn't exist"});    //404 Not found
    const {name,email}=user;
    res.json({name,email});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
})

router.put("/users/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const {bio} = req.body;
        const user = await User.findById(id);
        if(!user)
            return res.status(404).json({message:"User not found "});
        const updateUser = await User.findByIdAndUpdate(id,{bio},{new:true});//search and update already
        res.json({
            message:"Bio Added "+bio, 
            user:updateUser.name
        });
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

router.delete("/users/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const user= await User.findById(id);//In findById no need to send as object. 
        if(!user)
            return res.status(404).json({message:"User not found"});
        const userDelete= await User.findByIdAndDelete(id);
        res.status(200).json({message:"User Deleted Succesfully"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

router.post("/users/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser)
           return res.status(404).json({message:"Email id is wrong or user dosen't exist with this email"});
        const hashedPassword = existingUser.password;
        const isMatch = await bcrypt.compare(password,hashedPassword);
        if(!isMatch)
          return  res.status(401).json({message:"Wrong Password, Enter Correct Password"});//Unauthorized Access
        const token = jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({message:"Welcome "+existingUser.name,token,id:existingUser['_id']});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
})

module.exports = router;


//we can create methods for hashing and comparing instead of writing in login and register 

// async function hashPassword(password) {
//   return await bcrypt.hash(password, 10);
// }

// async function comparePassword(password, hashedPassword) {
//   return await bcrypt.compare(password, hashedPassword);
// }