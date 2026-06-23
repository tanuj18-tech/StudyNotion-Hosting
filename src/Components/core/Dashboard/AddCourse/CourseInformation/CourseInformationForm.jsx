import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementField from "./RequirementField"
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { IconBtn } from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import {COURSE_STATUS} from "../../../../../utils/constants"
export const CourseInformationForm = () => {
  
   // useForm use krne wale
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm();
  
  const dispatch = useDispatch();
   const {course, editCourse} = useSelector((state)=> state.course);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  // console.log(token);
    // useState meh  {} use nahi krna
   const [courseCategories, setCourseCategories] =  useState([]);

         const getCategories = async () =>{
        // console.log("hii");
          setLoading(true);

          const categories = await fetchCourseCategories();
          // console.log("categorries = ",categories);
          if(categories.length> 0){
            setCourseCategories(categories)
          } 
          setLoading(false);
      }

      
   // first render pe 
  useEffect(()=>{
            // console.log("hii");

 


      if(editCourse){
        setValue("courseTitle",course.courseName);
        setValue("courseDescription", course.courseDescription);
        setValue("coursePrice",course.price);
        setValue("courseTags",course.tag);
        setValue("courseBenefits",course.whatYouWillLearn);
        setValue("courseCategory",course.category);
        setValue("courseRequirements",course.instructions);
        setValue("courseImage",course.thumbnail);
          console.log("idhar ka ",course.whatYouWillLearn);
      }
      getCategories();
  },[])


    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
          currentValues.courseDescription !== course.courseDescription ||
          currentValues.coursePrice !== course.price ||
          currentValues.courseTags.toString() !== course.tag.toString() ||
          currentValues.courseTitle !== course.courseName ||

          currentValues.courseBenefits !== course.whatYouWillLearn ||
          currentValues.courseCategory._id !== course.category._id ||
          currentValues.courseImage !== course.thumbnail ||
          currentValues.courseRequirements.toString() !== course.instructions.toString()
        ) return true
        else return false;
    }


    //handles next button hit
  const onSubmit = async (data) => {

console.log("FORM DATA:", data);
      if(editCourse){

        if(isFormUpdated()){
          // console.log("hi");
             const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

    
         if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !== course.instructions.toString() ) {
            console.log("data.coursereq = ",data.courseRequirements);
          formData.append("instructions",  JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        //database meh change krna padega
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        console.log(result);
        setLoading(false);
        toast.success("Course updated successfully")
        if(result){
          // console.log("step value = ",step);
          console.log("aaya idahar");
          // setStep(2); wrong bsdk always dispatch
          dispatch(setStep(2));
          dispatch(setCourse(result));
        for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
              // console.log("result = ",result);
        }

               else {
        toast.error("No changes made to the course");
      }
        }

        return;
 

    }

    const formData = new FormData();
          formData.append("courseName", data.courseTitle)
          formData.append("courseDescription", data.courseDescription)
          formData.append("price", data.coursePrice)
          formData.append("tag", JSON.stringify(data.courseTags))
          formData.append("whatYouWillLearn", data.courseBenefits)
          formData.append("category", data.courseCategory)
          formData.append("status", COURSE_STATUS.DRAFT)
          formData.append("instructions", JSON.stringify(data.courseRequirements))
          formData.append("thumbnailImage", data.courseImage)
      
          setLoading(true);
        for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
          const result = await addCourseDetails(formData, token);
          console.log("reult ======ka hua = ",result);
          if(result){
            dispatch(setStep(2));
            console.log("upodate hua ??");
            dispatch(setCourse(result));
              console.log("form data ",formData);
              // console.log("result = ",result);
            toast.success("Succesfully added  details")
          }

          setLoading(false);
  } 

  return (
    // <div> 
    //   {/* use form meh define kiya hai handle submit */}
    //     <form onSubmit={handleSubmit(onsubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6" >
    //           <div className="flex flex-col space-y-2" >
    //             <label  className="text-sm text-richblack-5"  htmlFor='courseTitle'>Course Title <sup>*</sup></label>
    //             <input id='courseTitle' placeholder='Enter Course Title'
    //               {...register("courseTitle",{required:true})}
    //               className=' w-full text-black'
    //             ></input>

    //             {
    //               errors.courseTitle && (
    //                 <span>Course Title is required**</span>
    //               )
    //             }
    //           </div>

    //           <div >
    //             <label className="text-sm text-richblack-5"  id='courseDescription' htmlFor='courseDescription'>Course Description<sup>*</sup></label>
    //             <textarea id='courseDescription' placeholder='Enter description' 
    //               {...register("courseDescription",{required:true})} className=' min-h-[140px] w-full'
    //             ></textarea>

    //             {
    //               errors.CourseDescription && (
    //                 <span>Course Description required**</span>
    //               )
    //             }
    //           </div>

    //                         <div className='  relative'>
    //             <label className="text-sm text-richblack-5"  htmlFor='coursePrice'>Course Price <sup>*</sup></label>
    //             <input id='coursePrice' placeholder='Enter Course Price'
    //               {...register("coursePrice",{required:true,
    //                 // value enter krni hi  padegi
    //                 valueAsNumber: true, //no chaiye text nahi

    //               })}
    //                 className="form-style w-full !pl-12"
    //             ></input>
    //              {/* rupee icon */}
    //              <RiMoneyRupeeCircleFill className = 'absolute  bg-white text-richblack-700'/>
    //             {
    //               errors.coursePrice && (
    //                 <span>Course Price is required**</span>
    //               )
    //             }
    //           </div>

    //           <div>
    //             <label className="text-sm text-richblack-5"  htmlFor='courseCategory'>Course Category<sup>*</sup></label>
    //             {/* select matlab  drop  drown krna hai  toh */}
    //             <select id='courseCategory' defaultValue={""} {...register("courseCategory", {required:true})}>

    //               {/* usmeh values hogi using options */}
    //               <option value="" disabled>Choose a Category</option>
    //                 {
    //                   !loading && courseCategories.map((category, index)=>(
    //                          <option key={index} value={category?._id}>{category?.name}</option>
    //                    ))
    //                 }
    //             </select>

    //                {
    //               errors.courseCategory && (
    //                 <span>Course category is required**</span>
    //               )
    //             }
    //           </div>

    //           {/* tags keliye component banana padega */}
    //           <ChipInput label = "Tags" name = "courseTags" placeholder = "enter tags and press enter" register = {register}
    //               errors = {errors} setValue = {setValue} getValues = {getValues}
    //           />
    //     </form>
    //  </div>




    <div>
      <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 max-w-[500px] rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg"
       >
    {/* Course Title */}
    <div className="flex flex-col gap-2" >
      <label className="text-sm text-richblack-5">
        Course Title <sup className="text-pink-200">*</sup>
      </label>

      <input
        id="courseTitle"
        placeholder="Enter Course Title"
        {...register("courseTitle", { required: true })}
        className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {errors.courseTitle && (
        <span className="text-xs text-pink-200">
          Course Title is required
        </span>
      )}
    </div>

    {/* Description */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-richblack-5">
        Course Description <sup className="text-pink-200">*</sup>
      </label>

      <textarea
        id="courseDescription"
        placeholder="Enter description"
        {...register("courseDescription", { required: true })}
        className="min-h-[140px] w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {errors.courseDescription && (
        <span className="text-xs text-pink-200">
          Course Description is required
        </span>
      )}
    </div>

    {/* Price */}
    <div className="flex flex-col gap-2 relative">
      <label className="text-sm text-richblack-5">
        Course Price <sup className="text-pink-200">*</sup>
      </label>

      <input
        id="coursePrice"
        type="number"
        placeholder="Enter Course Price"
        {...register("coursePrice", {
          required: true,
          valueAsNumber: true,
        })}
        className="w-full rounded-md bg-richblack-700 px-10 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Rupee Icon */}
      <RiMoneyRupeeCircleFill className="absolute left-3 top-9 text-xl text-richblack-300" />

      {errors.coursePrice && (
        <span className="text-xs text-pink-200">
          Course Price is required
        </span>
      )}
    </div>

    {/* Category */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-richblack-5">
        Course Category <sup className="text-pink-200">*</sup>
      </label>

      <select
        id="courseCategory"
        defaultValue=""
        {...register("courseCategory", { required: true })}
        className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="" disabled>
          Choose a Category
        </option>

        {!loading &&
          courseCategories.map((category, index) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
      </select>

      {errors.courseCategory && (
        <span className="text-xs text-pink-200">
          Course category is required
        </span>
      )}
    </div>

    {/* Tags */}
    <div>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        
      />
    </div>

      {/* thumbnail banana */}
         <Upload
              name="courseImage"
              label="Course Thumbnail"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editCourse ? course?.thumbnail : null}
       />


        {/* Benefitts of the course */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-5" htmlFor='coursebenefits'>Benefits of the course<sup className='text-xs text-pink-200'>*</sup></label>
          <textarea id='coursebenefits' placeholder='Enter benefits of this course'
              className="min-h-[140px] w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"

          {...register("courseBenefits", {required:true}) }></textarea>


          {
            errors.courseBenefits && (
              <span className='text-xs text-pink-200'>Benefits of this course are required**</span>
            )
          }
        </div>

        <RequirementField name = "courseRequirements" label = "Requirements/Instructions" register = {register} errors = {errors} setValue = {setValue} 
          getValues = {getValues}
        />


        <div className=' text-white gap-x-6   flex justify-end'>
          { 
          // agar edit variable true hai toh
            editCourse && (
              
                <button onClick={()=> dispatch(setStep(2))} 
                     className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}

                >Continue Without Saving</button>
            )
          }

          {/* type submit nai diya toh form backend nai pohchega */}
          <IconBtn type="sumbit" text = {!editCourse ? "Next": "Save Changes"}/>
        </div>
   </form>
</div>
  )
}





// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse, setStep } from "../../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../../utils/constants"
// import {IconBtn} from "../../../../common/IconBtn"
// import Upload from "../Upload"
// import ChipInput from "./ChipInput"
// import RequirementsField from "./RequirementField"

// export default function CourseInformationForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm()

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true)
//       const categories = await fetchCourseCategories()
//       if (categories.length > 0) {
//         // console.log("categories", categories)
//         setCourseCategories(categories)
//       }
//       setLoading(false)
//     }
//     // if form is in edit mode
//     if (editCourse) {
//       // console.log("data populated", editCourse)
//       setValue("courseTitle", course.courseName)
//       setValue("courseShortDesc", course.courseDescription)
//       setValue("coursePrice", course.price)
//       setValue("courseTags", course.tag)
//       setValue("courseBenefits", course.whatYouWillLearn)
//       setValue("courseCategory", course.category)
//       setValue("courseRequirements", course.instructions)
//       setValue("courseImage", course.thumbnail)
//     }
//     getCategories()

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory._id !== course.category._id ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     ) {
//       return true
//     }
//     return false
//   }

//   //   handle next button click
//   const onSubmit = async (data) => {
//     // console.log(data)

//     if (editCourse) {
//       // const currentValues = getValues()
//       // console.log("changes after editing form values:", currentValues)
//       // console.log("now course:", course)
//       // console.log("Has Form Changed:", isFormUpdated())
//       if (isFormUpdated()) {
//         const currentValues = getValues()
//         const formData = new FormData()
//         // console.log(data)
//         formData.append("courseId", course._id)
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle)
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc)
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice)
//         }
//         if (currentValues.courseTags.toString() !== course.tag.toString()) {
//           formData.append("tag", JSON.stringify(data.courseTags))
//         }
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits)
//         }
//         if (currentValues.courseCategory._id !== course.category._id) {
//           formData.append("category", data.courseCategory)
//         }
//         if (
//           currentValues.courseRequirements.toString() !==
//           course.instructions.toString()
//         ) {
//           formData.append(
//             "instructions",
//             JSON.stringify(data.courseRequirements)
//           )
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage)
//         }
//         // console.log("Edit Form data: ", formData)
//         setLoading(true)
//         const result = await editCourseDetails(formData, token)
//         setLoading(false)
//         if (result) {
//           dispatch(setStep(2))
//           dispatch(setCourse(result))
//         }
//       } else {
//         toast.error("No changes made to the form")
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("courseName", data.courseTitle)
//     formData.append("courseDescription", data.courseShortDesc)
//     formData.append("price", data.coursePrice)
//     formData.append("tag", JSON.stringify(data.courseTags))
//     formData.append("whatYouWillLearn", data.courseBenefits)
//     formData.append("category", data.courseCategory)
//     formData.append("status", COURSE_STATUS.DRAFT)
//     formData.append("instructions", JSON.stringify(data.courseRequirements))
//     formData.append("thumbnailImage", data.courseImage)
//     setLoading(true)
//     const result = await addCourseDetails(formData, token)
//     if (result) {
//       dispatch(setStep(2))
//       dispatch(setCourse(result))
//     }
//     setLoading(false)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
//     >
//       {/* Course Title */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseTitle">
//           Course Title <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-style w-full"
//         />
//         {errors.courseTitle && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course title is required
//           </span>
//         )}
//       </div>
//       {/* Course Short Description */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
//           Course Short Description <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseShortDesc && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Description is required
//           </span>
//         )}
//       </div>
//       {/* Course Price */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="coursePrice">
//           Course Price <sup className="text-pink-200">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-style w-full !pl-12"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Price is required
//           </span>
//         )}
//       </div>
//       {/* Course Category */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseCategory">
//           Course Category <sup className="text-pink-200">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Category is required
//           </span>
//         )}
//       </div>
//       {/* Course Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />
//       {/* Course Thumbnail Image */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />
//       {/* Benefits of the course */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
//           Benefits of the course <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", { required: true })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseBenefits && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Benefits of the course is required
//           </span>
//         )}
//       </div>
//       {/* Requirements/Instructions */}
//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />
//       {/* Next Button */}
//       <div className="flex justify-end gap-x-2">
//         {editCourse && (
//           <button
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//           >
//             Continue Wihout Saving
//           </button>
//         )}
//         <IconBtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   )
// }