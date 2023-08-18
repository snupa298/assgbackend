const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:2,
        max:50
    },
   
    email:{
        type:String,
        require:true,
        max:50
    },
    password:{
        type:String,
        require:true,
        min:5,
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String
    
    },
    
}
)

const User=mongoose.model("User",UserSchema)
module.exports=User;