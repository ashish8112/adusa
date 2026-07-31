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
        required : true,
        select:false
    },
    bio:{
        type: String,
        default : ""
    }
}
const userSchema = new mongoose.Schema(userStructuer);

const User = mongoose.model("User",userSchema);  

module.exports = User; 
