    const User = require("../models/User"); 
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");



    const registerUser = async (req,res)=>{
        try{
        const {name,email,password} = req.body; //destructing in key of name,email and password.
        const existingUser = await User.findOne({email});       // email : "abc@1234",
        if(existingUser){
            return res.status(400).json({message:"Email is already Registered"});
        }
        // await new User({name,email,password}).save();    Decrease Readability.
        const hashedPassword = await bcrypt.hash(password,10); 
        const user = new User ({name,email,password:hashedPassword});
        await user.save();  //saving document (row) int collection (table).
        res.status(201).json({message: "User Registered"});      //201 Created
        }
        catch (err)
        {
            res.status(500).json({error:err.message});
        }
    }

    const loginUser = async(req,res)=>{
        try{
            const {email,password}=req.body;
            const existingUser = await User.findOne({email}).select("+password");
            if(!existingUser)
            return res.status(404).json({message:"Email id is wrong or user dosen't exist with this email"});
            const hashedPassword = existingUser.password;
            const isMatch = await bcrypt.compare(password,hashedPassword);
            if(!isMatch)
            return  res.status(401).json({message:"Wrong Password, Enter Correct Password"});//Unauthorized Access
            const token = jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_SECRET,{expiresIn:"7d"});
            res.status(200).json({name:existingUser.name,token,id:existingUser['_id']});
        }
        catch(err)
        {
            res.status(500).json({error:err.message});
        }
    }


    module.exports = {registerUser, loginUser};