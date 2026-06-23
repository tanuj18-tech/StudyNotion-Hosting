const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/subSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")

exports.updateCourseProgress = async (req, res) => {
  console.log("req = ",req.body);
  const { courseId, subSectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the subsection is valid
    console.log("subsection id = ",subSectionId);
    const subsection = await SubSection.findById(subSectionId);
    console.log("subsection = ",subsection);
     if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }
    console.log("course id user id = ",courseId)
    console.log("useee ",userId)

    // const docs = await CourseProgress.find({})
    // console.log("docs = ",docs)


    const docs = await CourseProgress.find({
  userId: userId
});

console.log("User Progress Docs:", docs);
 
    // Find the course progress document for the user and course
    let courseProgressDocument = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
      console.log("course progress document = ",courseProgressDocument)
    if (!courseProgressDocument) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      // If course progress exists, check if the subsection is already completed
      // yeh class pehle hi dekha  hua hai kya dekh
      if (courseProgressDocument.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }
      //already class complete nai hai toh yeh class ki id daal do 
      // Push the subsection into the completedVedeos array
      courseProgressDocument.completedVideos.push(subSectionId)
    }

    //iss CourseProgress model  ka document mongo meh save karo
    // Save the updated course progress
    await courseProgressDocument.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

 