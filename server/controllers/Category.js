const mongoose = require("mongoose");
const Category = require("../models/category");
 const Course = require("../models/Course");

exports.createCategory = async (req,res)=>{
    try {
            const {name,description} = req.body;
            if(!name || !description){
                return res.status(400)
                        .json({
                            success:false,
                            message:"all fields are required"
                        })
            }

            const CategoryDetails = await Category.create({
                name:name,
                description:description
            })

            console.log(CategoryDetails);

                   return res.status(200)
                        .json({
                            success:true,
                            message:"Category created successfully"
                        })

    } catch (error) {
        console.log(error.message);
                        return res.status(400)
                        .json({
                            success:false,
                            message:"error in creating Category"
                        })
    }
}


exports.showAllCategories = async (req,res) => {
    try {
             const allCategories = await Category.find({},{name:true,description:true})
                          return res.status(200)
                        .json({
                            success:true,
                            message:"all Categories returned succesfully",
                            data: allCategories
                        })


    } catch (error) {
        console.log(error.message);
                     return res.status(400)
                        .json({
                            success:false,
                            message:error.message
                        })
    }
}



//category page details 
exports.categoryPageDetails = async (req, res) => {
    try {
        console.log("resq body ",req.body);
      //iss category  id ka page details dikhao  
            const {categoryId} = req.body;
            //geet courses for specified category
        console.log("category id = ",categoryId);
            

//findOne kiya toh phir {_id:categoryId}
//Category meh jo courses naam ka array hai usmeh jao
console.log("hiiii");
  const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
   //   idhar instructor populate nahi kroge toh udhar instructor ka id ayega sirf , name  nahi la paoge
           populate: [
      {
        path: "ratingAndReviews",
      },
      {
        path: "instructor",
      },
    ],
   
        })
         
         console.log("selected category ", selectedCategory)     

             if(!selectedCategory){
                return res.status(404).json({
                    success: false,
                    message: "Category Not found"
                })
             }
             
      if (selectedCategory.courses?.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
          
        })
      }

//DIFFERENT CATEGORIES KELIYE LEAVING THIS
             /// define a variable to  get courses for different categories
 //dont do findOne as itmay  return only one docu
 //course ids ki jagah unke document  dikha
    const differentCategories = await Category.find({
      //ne means not equal to
      _id: {$ne: categoryId}
        })
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "instructor"
        })

        

            // variable to get top-selling courses
        // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
    //Inside each course, it again populates instructor.  
          populate:[
            {
            path: "instructor",
        },
//rating and revies populte nai krega toh udhar string ayega value nai ayegi jiski wajah se compute nai krpayegea uddharr

        {
          path: "ratingAndReviews"
        }


          ]  
        })

//Extracts courses from each category
//Flattens them into one array
//ek array meh  dalta hai  sab  courses
       const allCourses = allCategories.flatMap((c) => c.courses)
      const mostSellingCourses = allCourses
   //This sorts courses descending order based on sold 
   // a,b is 2 courses from allCourses  
        .sort((a, b) =>     (b.studentsEnrolled?.length || 0) -
      (a.studentsEnrolled?.length || 0))
        //top 10
        .slice(0, 10)
        console.log("mostSellingCourses COURSE", mostSellingCourses)     
            // get top selling courses
                       return res.status(200).json({
                    success: true,
                    data: {
                        selectedCategory,
                        differentCategories,
                        mostSellingCourses
                    },
                    message:"data is upar"

                })
    } catch (error) {
            console.log(error);
                //           return res.status(404).json({
                //     success: false,
                //     message: "something went wrong in getting category details"
                // })
    }
}


   