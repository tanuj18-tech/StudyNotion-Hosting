import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import {setCourseSectionData, setCompletedLectures, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
import { VideoDetailsSidebar } from "../Components/core/ViewCourse/VideoDetailsSidebar";
import {CourseReviewModal} from "../Components/core/ViewCourse/CourseReviewModal"
const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect( () => {
          const setCourseSpecificDetails = async () =>{
            const courseData = await getFullDetailsOfCourse(courseId, token);
    //  konsa controller hai iss function ka chaiye toh click  on it then on api then again on api , see in api last name , search that name in controoller
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            // data return udhar calculate krke hi return karraha
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            })

            dispatch(setTotalNoOfLectures(lectures));
          }

          setCourseSpecificDetails(); // <-- MISSING
    },[courseId, token, dispatch])


    return (
      <>
       <div className="relative flex min-h-[calc(100vh-3rem)]">
          <VideoDetailsSidebar setReviewModal = {setReviewModal}/>

          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div  className="mx-6">
                 <Outlet/>
            </div>
              
          </div>
      </div>

        {
          reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
      </>
 
    )
}

export default ViewCourse;