const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course");
const mongoose = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const User = require("../models/User")
// require("dotenv").config();
const {uploadImageToCloudinary} = require("../utils/imageUploader");
  
//user meh null pada hua hai profile meh toh create matlab 
exports.updateProfile = async (req, res) => {
  try {
    // ✅ get data (with defaults)
    const {
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = ""
    } = req.body;

    // ✅ get user id from auth middleware
    const id = req.user.id;

    // ✅ find user
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("user Details", userDetails);

    // ✅ get profile id
    let profileId = userDetails.additionalDetails;
    console.log("profile id", profileId);

    // ✅ find profile
    let profileDetails = await Profile.findById(profileId);
    console.log("Profile details = ", profileDetails);

    // 🔥 FIX: if profile does not exist, create it
    if (!profileDetails) {
      profileDetails = await Profile.create({
        dateOfBirth: "",
        about: "",
        gender: "",
        contactNumber: "",
      });

      // link profile to user
      userDetails.additionalDetails = profileDetails._id;
      await userDetails.save();
    }

    console.log("user details now ",userDetails);

    // ✅ update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    console.log("profile detailas = ",profileDetails);
    // ✅ save  
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profileDetails,
    });

  } catch (error) {
    console.log("Error in updateProfile:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req,res) => {
    try {
            // get id
            const id = req.user.id;
            //User ka document ajyaega ismeh
            const userDetails = await User.findById(id);
            if(!userDetails){
                     return res.status(500).json({
                    success:false,
                    message:"user not found"
                })
            }

            //delete profile
            //additional deta
            await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
    //             await Profile.findByIdAndDelete({
    //   _id: new mongoose.Types.ObjectId(user.additionalDetails),
    // })


            // unenroll student from all courses
    //       for (const courseId of User.courses) {
    //         //User.courses meh courses ki ids milengi
    //         //uss course meh se studentsEdnrooled array meh  se yeh wali id ko pull  krna padega
    //   await Course.findByIdAndUpdate(
    //     courseId,
    //     { $pull: { studentsEnrolled: id } },
    //     { new: true }
    //   )
    // }
            // delete user
            await User.findByIdAndDelete({_id: id});

       return res.status(200).json({
                success:true,
                message:"user deleted successfully",
            
                })
             
    } catch (error) {
      console.log("cc ",error.message);
              return res.status(500).json({
                success:false,
                message:"user deletion unsuccessfull"
            
                })
    }
}


exports.getAllUserDetails = async (req,res) => {
    try {
      
                const id = req.user.id;
//user ka document show krega with profile ids(ids ka name,baki fields)
    const userDetails = await User.findById(id).populate("additionalDetails");
    
                      return res.status(200).json({
                success:true,
                message:"user data fetched successfully",
                              data:userDetails

                })
    } catch (error) {
                 return res.status(500).json({
                success:false,
                message:error.message
                 })
    }
 
}


exports.updateDisplayPicture = async (req, res) => {
  try {
    console.log("hellow");
    const displayPicture = req.files.displayPicture;
    console.log(displayPicture);
    const userId = req.user.id;
    console.log("req",userId);
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      //cloudinary upload krne se pehle iss image ki height ko 1000 karega aur qualiy bhi 1000 karega
       1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      //search based on  this
      { _id: userId },
      //updation kaam (image ek attribute hai jiska type string hai)
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    console.log("eerrroror ",error.message);
     return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id
//     console.log("useriidddd ",userId);
//     let userDetails = await User.findOne({
//       _id: userId,
//     })
//       .populate({
//         //User meh courses naam ka array hai aur usmeh courses ki ids stored hai 
//         path: "courses",
//         //ab course meh agaya toh usmeh  ek coursecontent naam ka array  hai jismeh ids hai Sections ki
//         populate: {
//           path: "courseContent",
//           //Section meh subSection naam ka ek array hai jismeh ids store hai , un ids ke bajay unka data show karo like title, timeduration, vedioUrl, description
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec()

//       console.log("userDeetails = ",userDetails);

//       //toObject() → Converts a Mongoose document into a normal JavaScript object.
//     userDetails = userDetails.toObject()
//     let SubsectionLength = 0;

//     for (let i = 0; i < userDetails.courses.length; i++) {
//       let totalDurationInSeconds = 0
//       SubsectionLength = 0
//       for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) 
//         {
        

//         //adds all vedios time duration 
//         totalDurationInSeconds += userDetails.courses[i].courseContent[
//           j
//         ].subSection.reduce((accumulator, current) => accumulator + parseInt(current.timeDuration), 0);
       
    

//         //subsection array ki length nikala that is kitne classess hue hai 
//         SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
//       }

//              //see book
//         userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);


//       let courseProgressDocument = await CourseProgress.findOne({
//         courseID: userDetails.courses[i]._id,
//         userId: userId,
//       })

//       //subsections (classes ki length) array ki length
//      let courseProgressCount = courseProgressDocument?.completedVideos?.length || 0;

//       //agar subsection ki array meh koi ids nai hai mtlb 
//       if (SubsectionLength === 0) {
//         userDetails.courses[i].progressPercentage = 0;
//       } else {
//         // To make it up to 2 decimal point
//         const multiplier = 100;
//         userDetails.courses[i].progressPercentage =
//           Math.round(
//             (courseProgressCount / SubsectionLength) * 100 * multiplier
//           ) / multiplier
//       }
//     }

//     console.log("now userDetails = ", userDetails)
//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       data: userDetails.courses,
//     })


//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

exports.getEnrolledCourses = async (req, res) => {
  try {
        //     That means:

        // User ID is coming from JWT token
        // NOT from request body
        
    const userId = req.user.id;
    console.log("userId:", userId);

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
      
    // 🔴 Check BEFORE using toObject()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log("userDetails (raw):", userDetails);

    // convert to normal object
    userDetails = userDetails.toObject();

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let SubsectionLength = 0;

      const courseContent =
        userDetails.courses[i].courseContent || [];
      console.log("course content = ",courseContent)
      for (let j = 0; j < courseContent.length; j++) {
        const subsections =
          courseContent[j].subSection || [];
        console.log("sub section = ",subsections)
        // ✅ Safe reduce
        totalDurationInSeconds += subsections.reduce(
          (acc, curr) =>
            acc + parseInt(curr.timeDuration || 0),
          0
        );

        SubsectionLength += subsections.length;
      }

      // total duration
      userDetails.courses[i].totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);

      // fetch progress
      let courseProgressDocument = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });

      let courseProgressCount =
        courseProgressDocument?.completedVideos?.length || 0;

      // progress calculation
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 0;
      } else {
        const multiplier = 100;
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) *
              100 *
              multiplier
          ) / multiplier;
      }
    }

    // console.log("final userDetails:", userDetails);

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.error("GET ENROLLED COURSES ERROR:", error); // ✅ VERY IMPORTANT
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    //instructor hi call marega isko
    const courseDocument = await Course.find({ instructor: req.user.id })

    const courseData = courseDocument.map((course) => {
      //size of studentsEnroolled nikala hai  iss course keliye
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      //yeh bhi map meh hi chal raha ahi
      //naya document hi banaya for this course aur woh return kiya
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      // courseData ko return kiya aur phir response meh usko bhejdia
      return courseDataWithStats;
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}