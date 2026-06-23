const mongoose = require("mongoose");

const Category = new mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    }
    ,
 // ref: konse model ki id rahegi ismeh woh   
    courses:[{
         type:mongoose.Schema.Types.ObjectId,
           ref:"Course",
  
    }],
    description:{
          type:String,
        required:true,
        trim:true
    }
})


module.exports = mongoose.model("Category",Category);