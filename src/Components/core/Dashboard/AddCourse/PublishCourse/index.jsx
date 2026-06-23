import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

// slice imports
import { setStep, resetCourseState } from "../../../../../slices/courseSlice";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      public: false,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);

  // set checkbox value when course loads
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const goBack = () => {
    dispatch(setStep(2));
  };

  const handleCoursePublish = async () => {
    // prevent unnecessary API call
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT &&
        getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;

    const data = {
      courseId: course._id,
      status: courseStatus,
    };

    console.log("DATA SENT:", data);

    setLoading(true);
    const result = await editCourseDetails(data, token);
    setLoading(false);

    if (result) {
      console.log("UPDATED COURSE:", result);
      goToCourses();
    } else {
      console.log("Update failed ❌");
    }
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 w-[500px] bg-richblack-800 p-6 ">
      <p className="text-2xl text-white font-semibold">Publish Course</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg ">
            <input
              id="public"
              type="checkbox"
               className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
              {...register("public")}
            />
            <span className="ml-2 text-richblack-400">Make this course as Public</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
  className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"          >
            Back
          </button>

          <IconBtn
            type="submit"
            disabled={loading}
            text={loading ? "Saving..." : "Save Changes"}
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {IconBtn} from "../../../../common/IconBtn"
// import { COURSE_STATUS } from "../../../../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"

// //slice function import krna padega
// import { setStep } from "../../../../../slices/courseSlice";
// import { resetCourseState } from "../../../../../slices/courseSlice";
// const PublishCourse = () => {
//       const {register, handleSubmit, setValue, getValues} = useForm();
//       const dispatch = useDispatch();
//       const {token}  = useSelector((state) => state.auth);
//       const {course} = useSelector((state) => state.course);
//       const [loading, SetLoading] = useState(false);
//       // NOT NAVIGATION...
//       const navigate = useNavigate();

//       useEffect(  () => {
//         if(course?.status === COURSE_STATUS.PUBLISHED ){
//             setValue("public",true);
//         }
//       },[])


//       const goToCourses = () => {
//             // dispatch(resetCourseState());
//             navigate("/dashboard/my-courses")
//               dispatch(resetCourseState())
//        }
//       const handleCoursePublish = async () =>{
//           if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
//               (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
//                     goToCourses();
//                     return;
//               }



//               // if form is updated
//               const formData = new FormData();
//               formData.append("courseId",course._id);
//               const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
//               formData.append("status", courseStatus);
//                   //AESA NAI DEGA DATA
//                   // console.log("form data = ",formData);
//               for (let pair of formData.entries()) {
//                   console.log(pair[0], pair[1]);
//                   }
//               //api  call mar skte ho
//               SetLoading(true);
//               const result = await editCourseDetails(formData, token);
//                   console.log("result  == ");
//               if(result){
//                   console.log("API RESULT:", result);
//                   goToCourses();
//               }
//               SetLoading(false);
//       }


      
//       const onSubmit = () => {
//          handleCoursePublish();
//       }

//       const goBack = () => {
//             dispatch(setStep(2));
//       }
//        return (
//           <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 text-white">
//                 <p>Publish Course</p>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                       <div>
//                         <label htmlFor="public">
//                           <input id="public" type="checkbox" {...register("public")}></input>
//                               <span className=" ml-1"> Make this course as Public</span>  
//                           </label>
//                       </div>

//                       <div>
//                         <button  type="button" onClick={goBack}>
//                             Back
//                         </button>

//                         <IconBtn  type="submit" text = "save changes"/>
//                       </div>
//                 </form>
//           </div>
// )
// }


 




// export default PublishCourse;











// // import { useEffect, useState } from "react"
// // import { useForm } from "react-hook-form"
// // import { useDispatch, useSelector } from "react-redux"
// // import { useNavigate } from "react-router-dom"

// // import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
// // import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
// // import { COURSE_STATUS } from "../../../../../utils/constants"
// // import {IconBtn} from "../../../../common/IconBtn"

// // export default function PublishCourse() {
// //   const { register, handleSubmit, setValue, getValues } = useForm()

// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()
// //   const { token } = useSelector((state) => state.auth)
// //   const { course } = useSelector((state) => state.course)
// //   const [loading, setLoading] = useState(false)

// //   useEffect(() => {
// //     if (course?.status === COURSE_STATUS.PUBLISHED) {
// //       setValue("public", true)
// //     }
// //   }, [])

// //   const goBack = () => {
// //     dispatch(setStep(2))
// //   }

// //   const goToCourses = () => {
// //     dispatch(resetCourseState())
// //     navigate("/dashboard/my-courses")
// //   }

// //   const handleCoursePublish = async () => {
// //     // check if form has been updated or not
// //     if (
// //       (course?.status === COURSE_STATUS.PUBLISHED &&
// //         getValues("public") === true) ||
// //       (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
// //     ) {
// //       // form has not been updated
// //       // no need to make api call
// //       goToCourses()
// //       return
// //     }
// //     const formData = new FormData()
// //     formData.append("courseId", course._id)
// //     const courseStatus = getValues("public")
// //       ? COURSE_STATUS.PUBLISHED
// //       : COURSE_STATUS.DRAFT
// //     formData.append("status", courseStatus)
// //     setLoading(true)
// //     const result = await editCourseDetails(formData, token)
// //     if (result) {
// //       goToCourses()
// //     }
// //     setLoading(false)
// //   }

// //   const onSubmit = (data) => {
// //     // console.log(data)
// //     handleCoursePublish()
// //   }

// //   return (
// //     <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
// //       <p className="text-2xl font-semibold text-richblack-5">
// //         Publish Settings
// //       </p>
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         {/* Checkbox */}
// //         <div className="my-6 mb-8">
// //           <label htmlFor="public" className="inline-flex items-center text-lg">
// //             <input
// //               type="checkbox"
// //               id="public"
// //               {...register("public")}
// //               className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
// //             />
// //             <span className="ml-2 text-richblack-400">
// //               Make this course as public
// //             </span>
// //           </label>
// //         </div>

// //         {/* Next Prev Button */}
// //         <div className="ml-auto flex max-w-max items-center gap-x-4">
// //           <button
// //             disabled={loading}
// //             type="button"
// //             onClick={goBack}
// //             className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
// //           >
// //             Back
// //           </button>
// //           <IconBtn disabled={loading} text="Save Changes" />
// //         </div>
// //       </form>
// //     </div>
// //   )
// // }