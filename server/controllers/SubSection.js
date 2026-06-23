const SubSection = require("../models/subSection");
const Section = require("../models/Section")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
// require("dotenv").config();
exports.createSubSection = async (req,res)=>{
    try {
//       console.log("BODY:", req.body);
// console.log("FILES:", req.files);
            // fetch data from req body
            const {sectionId, title, timeDuration, description} = req.body;
            // extract vedio file
            console.log("time duration = ",timeDuration)
            console.log(sectionId,title,timeDuration,description);
            const video = req.files.video;
            // console.log("subsection meh araha??");
            // TIME DURATION KA BHI VALIDATION LAGAYA AUR MEHNE BHEJA NAHI TOH 400 KA ERROR AGAYA
            if(!sectionId || !title || !description){
                return res.status(400).json({
                    success:false,
                    message:"all fields are required of Subsection"
                })
            }

            // upload vedio to cloudinary and get secureUrl
            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            // create a subsection
            const SubSectionDetails = await SubSection.create({
                title:title,
                timeDuration:timeDuration,
                description:description,
                VideoUrl:uploadDetails.secure_url
            })

            // update section with this subsection id 
            const updatedSection = await Section.findByIdAndUpdate(
                        {_id:sectionId},
                        {
                            $push:{
                                subSection:SubSectionDetails._id
                            }
                        },
                        {new:true}
                        // log updated section here using populate
                    ).populate("subSection").exec()

                    // YEH POPULATE AGAR NAI KIYA TOH FRONTEND MEH MAP KARTE WAQT DATA MEH SIRF ID'S AYENGI,
                    // AUR UNN IDS PE DATA.TITLE ... NAI KAR PAYEGA 
                    // ISLIYE IDS KI JAGAP UNKA DATA DAALDO , TAKI BAADMEH  .title krke use kar SAKOOOOOOOOO
                    // IDS KI JAGAH UNNN IDS KA DATA STORE HOJAEGA BASSS AUR KUCH NAHI HAI POPULATE
                    return res.status(200).json({
                        success:true,
                        message:"Sub Section created Successfully",
                        data:updatedSection
                    })

    } catch (error) {
      console.log(error.message);
                         return res.status(400).json({
                        success:false,
                        message:"Sub Section creation failed",
                    })
    }
}
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.VideoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

exports.deleteSubSection = async (req, res) => {
  try {
      console.log("req boodyy ",req.body);
    const { subSectionId, sectionId } = req.body
   
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it , to show to user
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}

 