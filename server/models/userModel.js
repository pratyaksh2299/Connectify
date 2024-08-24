const mongoose = require('mongoose');

const userModel=mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profilephoto :{
        type :String,
        default: ""
    },
    gender :{
        type:String,
        enum:['male','female'],
        required:true,
    }
},{timestamps:true});

const User=mongoose.model('User',userModel);

module.exports=User;