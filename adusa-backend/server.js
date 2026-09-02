require("dotenv").config();//must be on top to use env 
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cors({
  origin:["http://localhost:5000","https://adusa.vercel.app"]
}));




app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);

app.get("/api/health",(req,res)=>{
  res.json({status:"OK",uptime:`${Math.floor(process.uptime())}s`,timestamp:new Date().toISOString()}) // Date.toISOString() is instance method that's why we need new and Date.now() is Static Method so we don't need new
})

app.use((req,res)=>{
  res.status(404).json({message:"Invalid URL Enter Correct URL"});
})

app.use((err,req,res,next)=>{
    console.error(err.message);
    return res.status(err.status || 500).json({message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message})
})

mongoose.connect(process.env.MONGO_URI).then(()=>{  //return promise 
  console.log("Mongo DB connection established");
  app.listen(process.env.PORT,()=>{  
  console.log(`Server is started at ${process.env.PORT}`);
});
}).catch((err)=>{
  console.error("error: "+err.message); 
  process.exit(1);//backend server will be restarted on deployed render .
});