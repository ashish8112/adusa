const User = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUser = async (req,res)=>{
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

const getAllUsers = async(req,res)=>{
    try{
         //const users = await User.find({});//returns Array of Object becuase every documnet in object so Array of Ojbect
         const users = await User.find({}).select("-password") // it will exclude the password 
        //res.json({users});  we can send array,object or anything everything is valid json 
        res.json(users);
    }
    catch(err)
    {
      res.status(500).json({error:err.message});  
    }
}

const getUserById= async(req,res)=>{
    try{
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if(!user)
    return res.status(404).json({message:"User doesn't exist"});    //404 Not found
    res.json(user);
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
}

const updateUserById = async(req,res)=>{
    try{
        const id = req.user.id;
        const {bio} = req.body;
        const user = await User.findByIdAndUpdate(id,{bio},{new:true}).select("-password");//search and update already why new because it return new updated document so if we want can use in frontend without again new api call for user details
        if(!user)
            return res.status(404).json({message:"User not found "});
        res.json({
            message:"Bio Added "+bio, 
            user
        });
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
        res.status(200).json({message:"User Deleted Succesfully"})
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}


module.exports = {registerUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById};