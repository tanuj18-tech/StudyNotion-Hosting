const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   
    firstName:{
        type:String,
        require:true,
        trim:true
    }
    ,
    lastName:{
           type:String,
        require:true,
        trim:true
    },
    email:{
          type:String,
        require:true,
        trim:true
    },
    password:{
           type:String,
        require:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        require:true
    },
//additional Details matlab user ka about section (BIO) jisko profile ka nam dia hai    
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        require:true
    },
    courses:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        }
    ],
    //thumbanaiil  image
    image:{
        type:String,
        require:true
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress: [
    {
           type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }
    ],
    		approved: {
			type: Boolean,
			default: true,
		},
        // user active hai ki nahi
        	active: {
			type: Boolean,
			default: true,
		},
})


module.exports = mongoose.model("User",UserSchema);