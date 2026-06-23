import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { data } from "react-router-dom";
import { createSection, createSubSection, updateSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
 import { RxCross2 } from "react-icons/rx"
import Upload from "../Upload"
import {IconBtn} from "../../../../common/IconBtn"
                                                  // by  default add, view false hai aaye toh uski value lenge
const SubsectionModal = ({modalData, setModalData, add = false, view = false, edit = false}) => {
  // console.log(
  //   "modal datttaa = ",modalData
  // );

  // console.log("view = ",view)
  const {register, handleSubmit, setValue, formState: {errors}, getValues} = useForm();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
      if(view || edit){
        setValue("lectureTitle", modalData.title);
        setValue("lectureDesc", modalData.description);
        setValue("lectureVideo", modalData.VideoUrl);
      }
  }, []);

    const isFormUpdated = () => {
      const currentValues = getValues();

      if(currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.VideoUrl
       ) return true;
       else return false;
    }

    const handleEditSubSection = async () => {
         const currentValues = getValues();
         const formData = new FormData();

         formData.append("sectionId", modalData.sectionId);
         formData.append("subSectionId", modalData._id);

         if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
         }

                  if(currentValues.lectureDesc !== modalData.description){
            formData.append("description", currentValues.lectureDesc);
         }

                  if(currentValues.lectureVideo !== modalData.VideoUrl){
            formData.append("video", currentValues.lectureVideo);
         }

         setLoading(true);
          //  IDHAR UPDATE SECTION KO CALL LAGAYA THA
         const result = await updateSubSection(formData, token);
         if(result){
                  // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
         }

         setModalData(false);
         setLoading(false);
    }

    const onSubmit = async (data) => {
      // console.log("idahr data = ",data)
        // view meh koi button nai rehta
        if(view) return;

        if(edit){
          if(!isFormUpdated()){
            toast.error("No changes made to the form")
          } else{
            //edit krdo store meh
            handleEditSubSection();
          }

          return;
        }

          const formData = new FormData();
        formData.append("sectionId", modalData);
          formData.append("title", data.lectureTitle);
          formData.append("description", data.lectureDesc);
          formData.append("video", data.lectureVideo);

          setLoading(true);
          const result = await createSubSection(formData, token);
          if(result){
                  const updatedCourseContent = course.courseContent.map((section) =>
                   section._id === modalData ? result : section
                    )
                const updatedCourse = { ...course, courseContent: updatedCourseContent }
                dispatch(setCourse(updatedCourse))
          }

          setModalData(null);
          setLoading(false);
    }


  return (
      <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
              <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                  <p  className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add &&  "Adding"} {edit && "Editing"} Lecture </p>
                                          {/* loading true hai toh modal band  krne nai denge */}
                    <button onClick={ () => ( !loading ? setModalData(false): {} )  }>
                      <RxCross2 className="text-2xl text-richblack-5"/>
                    </button>
                </div>
     
              <form className="space-y-8 px-8 py-10" onSubmit={handleSubmit(onSubmit)}>
                  {/* video */}
                    <Upload name= "lectureVideo" label= "lecture Video" register={register} setValue={setValue} errors={errors} video = {true}
                    // VideoUrl hai kya videoUrl HAI kya dekh carefully
                        viewData={ view? modalData.VideoUrl: false}
                        editData={ edit? modalData.VideoUrl: false}
                    />

                    <div className="flex flex-col space-y-2">
                      <label className="text-sm text-richblack-5" htmlFor="lectureTitle">Lecture Title</label>
                      <input    disabled={view || loading} id="lectureTitle" placeholder="Enter lecture title"
                        {...register("lectureTitle", {required: true})}

                         className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
                      ></input>

                      {
                        errors.lectureTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                          Lecture Title is required
                        </span>)
                      }
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-sm text-richblack-5" htmlFor="lectureDesc">Lecture Description</label>
                      <textarea id="lectureDesc" placeholder="Enter lecture Description"
                        {...register("lectureDesc", {required: true})}
                        disabled={view || loading}
                      className=" rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400 resize-x-none min-h-[130px] w-full"
                      ></textarea>

                      {
                        errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                          Lecture description is required
                        </span>)
                      }
                    </div>

                      {
                        !view && (
                          <div  className="flex justify-end">     
                             {/* edit nai toh add hi hoga */}
                              <IconBtn text = { loading? "Loading...." : edit ? "Save changes" : "Save"}
                              />
                          </div>
                        )
                      }
              </form>


            </div>
      </div>
  )
}

export default SubsectionModal;
















// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { RxCross2 } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   createSubSection,
//   updateSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import {IconBtn} from "../../../../common/IconBtn"
// import Upload from "../Upload"

// export default function SubSectionModal({
//   modalData,
//   setModalData,
//   add = false,
//   view = false,
//   edit = false,
// }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm()

//   // console.log("view", view)
//   // console.log("edit", edit)
//   // console.log("add", add)

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)

//   useEffect(() => {
//     if (view || edit) {
//       // console.log("modalData", modalData)
//       setValue("lectureTitle", modalData.title)
//       setValue("lectureDesc", modalData.description)
//       setValue("lectureVideo", modalData.videoUrl)
//     }
//   }, [])

//   // detect whether form is updated or not
//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     if (
//       currentValues.lectureTitle !== modalData.title ||
//       currentValues.lectureDesc !== modalData.description ||
//       currentValues.lectureVideo !== modalData.videoUrl
//     ) {
//       return true
//     }
//     return false
//   }

//   // handle the editing of subsection
//   const handleEditSubsection = async () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     const formData = new FormData()
//     // console.log("Values After Editing form values:", currentValues)
//     formData.append("sectionId", modalData.sectionId)
//     formData.append("subSectionId", modalData._id)
//     if (currentValues.lectureTitle !== modalData.title) {
//       formData.append("title", currentValues.lectureTitle)
//     }
//     if (currentValues.lectureDesc !== modalData.description) {
//       formData.append("description", currentValues.lectureDesc)
//     }
//     if (currentValues.lectureVideo !== modalData.videoUrl) {
//       formData.append("video", currentValues.lectureVideo)
//     }
//     setLoading(true)
//     const result = await updateSubSection(formData, token)
//     if (result) {
//       // console.log("result", result)
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData.sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   const onSubmit = async (data) => {
//     // console.log(data)
//     if (view) return

//     if (edit) {
//       if (!isFormUpdated()) {
//         toast.error("No changes made to the form")
//       } else {
//         handleEditSubsection()
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("sectionId", modalData)
//     formData.append("title", data.lectureTitle)
//     formData.append("description", data.lectureDesc)
//     formData.append("video", data.lectureVideo)
//     setLoading(true)
//     const result = await createSubSection(formData, token)
//     if (result) {
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid min-h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5">
//             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
//           </p>
//           <button onClick={() => (!loading ? setModalData(null) : {})}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>
//         {/* Modal Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-8 px-8 py-10"
//         >
//           {/* Lecture Video Upload */}
//           <Upload
//             name="lectureVideo"
//             label="Lecture Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//             viewData={view ? modalData.videoUrl : null}
//             editData={edit ? modalData.videoUrl : null}
//           />
//           {/* Lecture Title */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
//               Lecture Title {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <input
//               disabled={view || loading}
//               id="lectureTitle"
//               placeholder="Enter Lecture Title"
//               {...register("lectureTitle", { required: true })}
//               className="form-style w-full"
//             />
//             {errors.lectureTitle && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture title is required
//               </span>
//             )}
//           </div>
//           {/* Lecture Description */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
//               Lecture Description{" "}
//               {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <textarea
//               disabled={view || loading}
//               id="lectureDesc"
//               placeholder="Enter Lecture Description"
//               {...register("lectureDesc", { required: true })}
//               className="form-style resize-x-none min-h-[130px] w-full"
//             />
//             {errors.lectureDesc && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture Description is required
//               </span>
//             )}
//           </div>
//           {!view && (
//             <div className="flex justify-end">
//               <IconBtn
//                 disabled={loading}
//                 text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   )
// }