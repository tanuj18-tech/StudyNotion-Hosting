import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import {RenderSteps} from "../AddCourse/RenderSteps"
export const Editcourse = () => {
  // My courses meh edit wala pencil  banane ka method hai yeh
  // woh ADD COURSE WALA ALAG TAB AUR YEH EDIT COURSE WALA ALAG TAB COMPLETELY DIFFRENT
  const dispatch = useDispatch();
  // url se course id  lega jo navigate meh  bheja hai 
  const {courseId} = useParams();
  console.log("course id = ",courseId);
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState();
  const {token} = useSelector((state) => state.auth);

    useEffect( () => {
      const populateCourseDetails = async () => {
          setLoading(true);
          const result = await getFullDetailsOfCourse(courseId, token);
          console.log("resul = ",result);
          if(result?.courseDetails){
              dispatch(setEditCourse(true));
              dispatch(setCourse(result?.courseDetails))
          }
      }

      populateCourseDetails();
    },[])
  return (
    <div className=' text-white'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
          <div className=' w-[800px]'>
              {
                course ? (<RenderSteps></RenderSteps>) : (<div>Course Not  Found</div>)
              }
          </div>
    </div>
  )
}



// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"

// import {
//   fetchCourseDetails,
//   getFullDetailsOfCourse,
// } from "../../../../services/operations/courseDetailsAPI"
// import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
// import RenderSteps from "../AddCourse/RenderSteps"

// export default function EditCourse() {
//   const dispatch = useDispatch()
//   const { courseId } = useParams()
//   const { course } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       const result = await getFullDetailsOfCourse(courseId, token)
//       if (result?.courseDetails) {
//         dispatch(setEditCourse(true))
//         dispatch(setCourse(result?.courseDetails))
//       }
//       setLoading(false)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   if (loading) {
//     return (
//       <div className="grid flex-1 place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5" >
//         Edit Course
//       </h1>
//       <div className="mx-auto max-w-[600px]">
//         {course ? (
//           <RenderSteps />
//         ) : (
//           <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
//             Course not found
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }