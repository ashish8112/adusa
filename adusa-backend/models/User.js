const mongoose = require("mongoose"); 

const userStructure={  
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
    },
    avatar:{
        type: String,
        default :""
    },
    college:{
        type: String,
        default: ""
    }
}
const userSchema = new mongoose.Schema(userStructure);

const User = mongoose.model("User",userSchema);  

module.exports = User; 
