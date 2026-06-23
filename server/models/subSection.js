const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
 
    title:{
        type:String,
     },
     //class kitne mint ka he
    timeDuration:{
        type: String,
     },
     //class ka vedio url
         VideoUrl:{
        type: String,
     },
         description:{
        type: String,
     },
     
})


module.exports = mongoose.model("SubSection",SubSectionSchema);