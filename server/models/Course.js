const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
        // CourseDescription:{
        // CAPITAL LETTER KA DHYAN RAKH BHAIII
    courseDescription:{
        type:String
    },
 //At least one value is required because required: true.   
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
required: true 
    },
    whatYouWillLearn:{
          type:String
    },
 // course content matlab ek course ke sections ko store krna unke section ids ko store krna   
    courseContent:[{
   type:mongoose.Schema.Types.ObjectId,
  ref:"Section"
    }],

    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
 // tag will store array of strings , ek string hi store nai karega
//  {
//   tag: ["Web Development", "JavaScript", "Backend"]
// }   
    tag:{
        type: [String],
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
//students ki id store krna jo enroll hue hai    
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    instructions: {
        type: [String]
    },
// draft matlab course abhi pura nai hua    
    status:  {
        type:String,
        enum:["Draft", "Published"]
    },
    	createdAt: {
		type:Date,
		default:Date.now
	},
 
})

module.exports = mongoose.model("Course",CourseSchema);