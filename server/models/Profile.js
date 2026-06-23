const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    gender:{
        type:String,
        require:true,
     }
    ,
    dateOfBirth:{
           type:String,
        require:true,
     },
    about:{
          type:String,
        require:true,
     },
     // trim- means remove extra spaces from the beginning and end of a string automatically before saving it to the database.
    contactNumber:{
           type:String,
        require:true,
        trim:true
    }

})


module.exports = mongoose.model("Profile",ProfileSchema);