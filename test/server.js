require("dotenv").config();
const express = require("express");
const app =express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

app.use(express.json());

app.use("/api/auth",authRoute);

app.use((req,res)=>{
    return res.status(404).json({message:"Please Enter Correct Route"});
})

app.listen(process.env.PORT,async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection Established and Server is started on ",+process.env.PORT);
    }
    catch(err){
        console.log("Server is not started because of error = "+err.message);
    }
})


