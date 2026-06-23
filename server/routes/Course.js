const express = require("express");
 const router = express.Router();

const {createCourse,  
      getCourseDetails,
      getFullCourseDetails,
      editCourse,
      getInstructorCourses,
      deleteCourse,
      showAllCourses} = require("../controllers/Course");

const {showAllCategories, createCategory, categoryPageDetails} = require("../controllers/Category");

const {createSection, updateSection, deleteSection} = require("../controllers/Section");

const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");

const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

const {
  updateCourseProgress
} = require("../controllers/courseProgress");

//importing middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
console.log("showAllCourses:", showAllCourses);
 
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
// frontent/backend post data tha aur yeh banaya that put
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

router.get("/showAllCourses",showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
// GET POST MEH  VATT LAG JATI HAI 
 router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
// 
router.delete("/deleteCourse",auth, isInstructor ,deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)



// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating",auth, isStudent, createRating);
// router.post("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;