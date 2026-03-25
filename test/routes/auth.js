const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Admin = require("../models/Admin");
const verifyToken = require("../middleware/verifyToken");

router.post("/user/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message:"User is already Registerd"});
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,email,hashedPassword});
        await user.save();
        const token = await jwt.sign({name,email},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(201).json({message:"Welcome "+name,token})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

router.post("/admin/register",async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin)
            return res.status(400).json({message:"Admin is already Registed"});
        const hashedPassword = await bcrypt.hash(password,10);
        const admin = new Admin({name,email,password:hashedPassword});
        await admin.save();
        res.status(201).json({message: "Welcome"+name});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

router.get("/admin/login",async(req,res)=>{
    try{
        const {id,email,password} = req.body;
        if(!id)
            return res.status(400).json({message:"Please Enter the id "});
        const admin= await Admin.findById(id);//In findById no need to send key as object 
        if(!admin)
            return res.status(400).json({message:"Enter correct Credential to login"});
        if(email!=admin.email)
            return res.status(400).json({message:"Incorrect email enter correct Email"});
        const isPasswordMatch = await bcrypt.compare(password,admin.password);
        if(!isPasswordMatch)
            return res.status(400).json({message:"Password is Wrong"});
        const users = await User.find({});
        const token = jwt.sign({name:admin.name,email},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({message:"Welcome "+admin.name,users,token});
   }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})


router.get("/users",verifyToken,async(req,res)=>{
    try{
    const users = await User.find({});
    res.status(200).json({message:"Welcome Mr "+req.user.name,users})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})


module.exports = router;
