const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/subSection");
 
exports.createSection = async (req,res) => {
    try {

        const {sectionName,courseId} = req.body;
        
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        // create section
        const newSection = await Section.create({sectionName});
        // update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                courseId,
                                {
                                    $push:{
                                        courseContent:newSection._id
                                    }
                                },
                                {new:true}
        )
        		.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
 
        return res.status(200).json({
            success:true,
            message:'section created successfully',
            data: updatedCourseDetails
        })
    } catch (error) {
                    return res.status(500).json({
            success:false,
            message:'unable to create section, please try again'
        })
    }
}

// ISS WALE updateSection meh course ko update nahi kiya tha aur uskkko return nai kiya tha
// jiski wajah se setCourse meh paili wali state ja rahi thi ,
// isss liye  section name update nai hora tha neeche wale meh krdiya update
// exports.updateSection = async (req,res) => {
//     try{
//         console.log("REQ BODY:", req.body);
//              const {sectionName,sectionId} = req.body;

//                      console.log("reques == ",sectionName);

//             if(!sectionName || !sectionId){
//           return res.status(400).json({
//                 success:false,
//                 message:"Missing properties"
//             })
//             }

//             const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId,
//                                         {sectionName},
//                                        { new:true}
//             )

//               return res.status(200).json({
//             success:true,
//             message:'section updated successfully',
//             data:updatedSectionDetails
//         })

//     }catch(error){
//                             return res.status(500).json({
//             success:false,
//             message:'unable to update section, please try again'
//         })
//     }
// }


// DELETE a section

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body

    // update section
    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    )

    // get updated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      })

    res.status(200).json({
      success: true,
      message: "section updated successfully",
      data: updatedCourse,   // 🔥 IMPORTANT
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to update section",
    })
  }
}

exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        console.log("backend meh delete horaha ??",course);
		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   


 