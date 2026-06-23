const Course = require("../models/Course")
const Category = require("../models/category") 
const Section =  require("../models/Section")
const subSection = require("../models/subSection")
// yeh schema hai 
const User = require("../models/User")
// yeh function import karraha
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const CourseProgress = require("../models/CourseProgress")
const {convertSecondsToDuration} = require("../utils/secToDuration")



// create course handleer
exports.createCourse = async (req, res) => {
  try {
    console.log("req kya araaha ",req);
    // destructure data from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions
    } = req.body;
    console.log("course name = ",courseName);
 console.log("what u will learn = ",whatYouWillLearn);

const tagg = JSON.parse(tag || "[]");
const instructionss = JSON.parse(instructions || "[]");

console.log("tagg = ", tagg);
console.log("instructionss = ", instructionss);

    // check thumbnail
    if (!req.files || !req.files.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    const thumbnail = req.files.thumbnailImage;

    // validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || tagg.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // default status
    if (!status) {
      status = "Draft";
    }

    // instructor id (coming from auth middleware)
    const userId = req.user.id;

    // check category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    // upload thumbnail to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: userId,
      whatYouWillLearn,
      price,
      // tagg, NOOO
      tag:tagg,
      category: categoryDetails._id,
      status,
      instructions: instructionss,
      thumbnail: thumbnailImage.secure_url,
    });
    console.log("new colurse  = ",newCourse);
    // add course to instructor
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // add course to category
    const updatedCategory = await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    console.log("updatedCategory =", updatedCategory);

    console.log("new coursesssssssss hereee = ",newCourse);
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};


//edit course details
exports.editCourse = async (req, res) => {
  console.log("req akhri barr");
  try {
        //STATUS DALLL BHAII VARNA FRONTEND SE TO TU BHEJARAHA HAI PAR DB MEH HI STORE NAI HUA TOH KESE FECTHC KAREGA
       const {courseId,courseDescription, courseName, price, whatYouWillLearn, status} = req.body;
       console.log("courseDescription: ",courseDescription)
     const instructions = JSON.parse(req.body.instructions || "[]");
    const tag = JSON.parse(req.body.tag || "[]");

       const course = await Course.findById(courseId);

      if(!course){
        return res.status(404).json({ error: "Course not found" })
      }

  //if thumbnail image is found, update it
  if(req.files){
    console.log("thumbnail update");
    const thumbnail = req.files.thumbnailImage;
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )

    course.thumbnail = thumbnailImage.secure_url
  }
  
  if (status) {
    console.log("Updating status to:", status);
  course.status = status;
}
 
// agar tu eddit kraha hai aur courseName, price tu set nai kiya toh yeh db meh empty chala jayega aur db  meh woh  field hat jayega
// toh tereko coursname, price nai dikega
// par agar tu courseName kuch value hai toh hi usko  badlega toh  db  meh  store hoga 

// ❌ Old logic:

// “Oh, name not given? Cool, I’ll delete it 😄”

// ✅ New logic:

// “Name not given? I’ll leave it as it is 👍”
// course.courseName = courseName
// course.price = price
// course.whatYouWillLearn = whatYouWillLearn

if (courseName !== undefined) {
  course.courseName = courseName;
}

if (price !== undefined) {
  course.price = price;
}

if (whatYouWillLearn !== undefined) {
  course.whatYouWillLearn = whatYouWillLearn;
}

if(courseDescription!==undefined){
  course.courseDescription = courseDescription;
}


 if (tag.length > 0) course.tag = tag;
    if (instructions.length > 0) course.instructions = instructions;
 

    await course.save()



    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()


    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })

 

  } catch (error) {
     console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}



exports.showAllCourses = async (req,res)=>{
    try{
            const allCourses= await Course.find(
              {status: "Published"},
      {courseName:true,price:true,thumbnail:true,instructor:true})
      .populate("instructor");

             return res.status(200).json({
                success:true,
                message: "displayed all courses",
                data:allCourses
    }) 
    }catch(error){
          console.log(error);
                      return res.status(500).json({
                success:false,
                message: "cannot show all courses",
    }) 
}
}


// get all courses
exports.getCourseDetails = async (req,res) => {
    try {
             const {courseId} = req.body;
             console.log("coursei ddd = ",courseId);
            //  const courseDetails = await Course.find({_id:courseId})
            //                                     .populate(
            //                                         {
            //                                             path:"instructor",
            //                                             populate:{
            //                                                 path: "additionalDetails"
            //                                             }
            //                                         }
            //                                     )
                                                
            //                                     .populate("category")
            //                                    .populate("ratingAndreviews")
            //                                     .populate({
            //                                         path:"courseContent",
            //                                         populate: {
            //                                             path: "subSection"
            //                                         }
            //                                     })

                                                          const courseDetails = await Course.findById(courseId)
                                                .populate("instructor")
                                                     
                                                
                                                
                                                .populate("category")
                                                // sahi se naam dekh ke populate karo nahi toh COURSE_DETALS_API EROROROR 
                                               .populate("ratingAndReviews")
                                                .populate({
                                                    path:"courseContent",
                                                    populate: {
                                                        path: "subSection"
                                                    }
                                                })

                                  // console.log(courseDetails);
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:`Course Details with id ${courseId} not found`
                })
            }

                if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      })
    }

                            return res.status(200).json({
                    success:true,
                    message:`Course Details fecthed successfully ${courseId}`,
                    data: courseDetails
                })

    } catch (error) {
      // console.log("idhar arah kya get course details meh");
                console.error(error);
                              return res.status(500).json({
                    success:false,
                    message:error.message
                })
    }   
}



exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
   
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
      
      // courseProgresss ka document sab ismeh ajyaega
    let courseProgressDocument = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressDocument)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    //Course model meh stored hai courseContent which is array  of section Ids
    courseDetails.courseContent.forEach((section) => {
      console.log("here subsection timeDuration = ",subSection.timeDuration)
      section.subSection.forEach((subSection) => {
              console.log("here subsection = ",subSection)

              console.log("here subsection timeDuration = ",subSection.timeDuration)

        // string to num "120"-> 120
        const t = parseInt(subSection.timeDuration)
        // sab classes ka total time nikala jitne subsection id add kiya hai Section meh 
        totalDurationInSeconds += t;
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        //completed vedios matlab array of subsection ids  dikhao
   completedVideos: courseProgressDocument?.completedVideos || []
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

 

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id
    console.log(instructorId);
    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
    console.log("instructor corses: ",instructorCourses);
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}



exports.deleteCourse = async (req, res) => {
  try {
    // pura course hi delete karrahe hai instructor 
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // sab students  course ke  baharnikal
    // array dega of studentIds
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      // har student ki  id nikalo
      await User.findByIdAndUpdate(studentId, {
      // User (student here) meh jo courses ka array hai usmeh se courseId nikalo
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    //array of sections milgaya..
    const courseSections = course.courseContent;

    for (const sectionId of courseSections) {
      // -sections of the section
      const sectionDocument = await Section.findById(sectionId)
      if (sectionDocument) {
        const subSectionsArray = sectionDocument.subSection;
        for (const subSectionId of subSectionsArray) {
          await subSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })

    
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}