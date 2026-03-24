//This file only defines blueprint (Structure) 

const mongoose = require("mongoose"); 

const userStructuer={  
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    bio:{
        type: String,
        default : ""
    }
}
const userSchema = new mongoose.Schema(userStructuer);// Creating User schema

const User = mongoose.model("User",userSchema); //creating tool or variable to use that collection 

module.exports = User;  //// 4. Export it for use elsewhere




// const userSchema = new mongoose.Schema({     // 2. Define the structure
//   name:  { type: String, required: true },
//   email: { type: String, required: true }
// });


// // models/User.js
// module.exports = User;        // "I'm making User available for others"

// // routes/auth.js
// const User = require('../models/User');  // "I'm taking User from that file"