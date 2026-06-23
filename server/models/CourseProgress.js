const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({
 
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
//kitne subsection complete kiya matlab completedVideos    
    completedVideos:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


module.exports = mongoose.model("CourseProgress",CourseProgressSchema);