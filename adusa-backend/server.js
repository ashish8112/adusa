require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{  //return promise 
  console.log("Mongo DB connection established");
}).catch((err)=>{
  console.error("error: "+err.message); 
});



app.use("/api/auth",authRoutes);  // app.use = saari requests handle karta hai (GET, POST, PUT, DELETE)

app.use((req,res)=>{
  res.status(404).json({message:"Invalid URL Enter Correct URL"});
})

app.listen(process.env.PORT,()=>{  
  console.log(`Server is started at ${process.env.PORT}`);
});



// we can connect server after connecting the db by writing listen code inside then of mongoose.connect so when connection established 
//then only server will start 

// or write like this we have written here becuase before doing any operation we are writing try and catch in every block 