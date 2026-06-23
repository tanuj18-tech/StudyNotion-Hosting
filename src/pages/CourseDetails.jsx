 
import { BiInfoCircle } from "react-icons/bi"
import React, { useEffect, useState } from 'react'

import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import toast from 'react-hot-toast'
import GetAvgRating from "../utils/GetAvgRating"
import Error  from "../pages/Error"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ConfirmationModal from '../Components/common/ConfirmationModal'
import RatingStars from "../Components/common/RatingStars"
import { formatDate } from '../services/formatDate'
import CourseDetailsCard from "../Components/core/Course/CourseDetailsCard"
import CourseAccordionBar from "../Components/core/Course/CourseAccordionBar"
import Footer from "../Components/common/Footer"
 import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
export const CourseDetails = () => {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {loading} = useSelector((state) => state.profile);

    // const {paymentLoading} = useState((state) => state.course);
    const [courseData, setCourseData] = useState();

    const [avgReviewCount, setAverageReviewCount] = useState(0);
    const [totalNoOfLectures, settotalNoOfLectures] = useState(0);

    const [confirmationalModalState , setconfirmationalModalState] = useState();

        const [isActive, setIsActive] = useState([]);

useEffect(() => {
  console.log("useEffect running");
}, []);


    useEffect(() =>  {

        const getFullCourseDetails = async () =>  {
                try {
                    console.log("id = ",courseId);
                    const result = await fetchCourseDetails(courseId);
                     console.log("result now = ",result);
                     setCourseData(result);
                    dispatch(setCourseSectionData(result?.courseContent || []));
                    dispatch(setEntireCourseData(result));
            } catch (error) {
                    console.log("Could not fectch course details");
                    toast.error(error.message);

            }
        }

        getFullCourseDetails();
 
    }, [courseId])

    useEffect( () => {
            let lectures = 0;
            console.log("course DATA : ",courseData);
            console.log("coursenameeee ",courseData?.courseName);
            courseData?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length || 0;
            })
            settotalNoOfLectures(lectures);
             console.log("letures = ",lectures);
             // 🔥 ADD THIS
dispatch(setTotalNoOfLectures(lectures));
    },[courseData])
    

    useEffect( () => 
        {
            const count = GetAvgRating(courseData?.ratingAndReviews);
            setAverageReviewCount(count);
    }, [courseData])



 



    const handleBuyCourse = () =>{
        if(token){
            //backend ko call laganewal function operations meh define karo
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }


        //user logged in nahi hai aur buy krne ki koshish  kraaha hai
        setconfirmationalModalState({
            text1: "You are not logged in",
            text2: "Please log in to continue",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setconfirmationalModalState(false)
        })
    }


    // jab tak data nahi aaya hai
    if(loading || !courseData){
        return (

            // spinner container meh nai  dala  toh spinner background adha white adha black ayega.... isliye isko parent do nahi toh dusra parent lega koi toh
           <div className="min-h-screen w-full flex flex-col items-center justify-center  bg-black text-white gap-4">
                <div className="spinner"></div>
                <p>Loading...</p>
    </div>
        )
    }
    console.log("now coursdata = ",courseData);

 

    const { _id, courseName, courseDescription, thumbnail, price, whatYouWillLearn, courseContent, ratingAndReviews, instructor, 
        studentsEnrolled, createdAt
    } = courseData;
    console.log("coursname = ",whatYouWillLearn);

     const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ?
            isActive.concat(id) :
            isActive.filter((e) => e!= id)
        )
    }
  return (
    <div className=' w-full mx-auto  relative bg-richblack-800  text-white  '>
        

        <div className=" flex  h-[350px] w-[80%] mx-auto mt-[50px]">

              <div className="mx-auto h-[400px]  box-content px-4 lg:w-[1260px] 2xl:relative ">

            <div className="mx-auto grid min-h-[370px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0">
                <div className="relative block max-h-[20rem]">
          

                        
                  <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5" >
                   <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
                <p className={`text-richblack-200`}>{courseDescription}</p>
                    <div className="text-md flex flex-wrap items-center gap-2">
                        <span  className="text-yellow-25">{avgReviewCount}</span>
                        <RatingStars Star_Size={24} Review_Count={avgReviewCount}/>
                        {/* text aur {} use krna hai toh backtick */}
                        {/* <span>{`${ratingAndReviews.length} reviews`}</span>
                        <span>{`${studentsEnrolled.length} students enrolled`}</span> */}
                        <span>{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                        <span>{`${studentsEnrolled?.length || 0} students enrolled`}</span>
                    </div>

                        <div>
                        <p>Created by {`${instructor.firstName} ${instructor.lastName}`} </p>
                        </div>

                        <div className="flex flex-wrap gap-5 text-lg">
                            <p  className="flex items-center gap-2"> <BiInfoCircle /> Created At {formatDate(createdAt)}</p>
                            <p className="flex items-center gap-2">
                                           {" "}
                                           <HiOutlineGlobeAlt /> English
                                        </p>
                            </div>

              

        </div>
       
                </div>
            </div>

            
        </div>
        
                  <div className=" w-[700px] h-[700px]">
                      <CourseDetailsCard course = {courseData} setconfirmationalModalState = {setconfirmationalModalState}
                        handleBuyCourse = {handleBuyCourse}
                        />
                    </div>
        </div>
   
     
                            

           
       

                   <div className=" text-white py-8    bg-black h-fit w-full">
                    <div className=" w-[80%] mx-auto my-8 ">
                        <div className="w-[50%]  mt-[30px] border  border-richblack-600 p-8">
                                                               <p  className="text-3xl font-semibold">What You'll Learn</p>
                        <div className="mt-5">
                            {whatYouWillLearn}
                        </div>
                        </div>
                    
                    {/* Course Content */}
                    <div className=" w-[50%] flex flex-col gap-3 mt-16 ">
                        <div>
                            <p className="text-[28px] font-semibold">Course Content:</p>
                        </div>
                        
                        <div className=" flex gap-x-6 justify-between">
                              <div className=" flex gap-x-4">
                                <span>{courseContent.length} section(s) {" "} </span>
                            
                            <span>
                                {totalNoOfLectures} lectures(s)
                            </span>

                            <span>
                                {courseData?.timeDuration ? courseData?.timeDuration : 0 }s total length
                            </span>

                             </div>
                            
                            <div >
                                <button className="text-yellow-25" onClick={() => setIsActive([])}>
                                    Collapse All Sections
                                </button>
                            </div>
                        </div>
                            
                            {/* Course Details Accordion */}
                            <div className="py-4">
                                 {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                                />
                            ))}
                            </div>

                                    <div className="mb-12 py-4">
                    <p className="text-[28px] font-semibold">Author</p>
                    <div className="flex items-center gap-4 py-4">
                        <img
                        src={
                            instructor.image
                            ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                        }
                        alt="Author"
                        className="h-14 w-14 rounded-full object-cover"
                        />
                        <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                    </div>
                    <p className="text-richblack-50">
                        {instructor?.additionalDetails?.about}
                    </p>
                    </div>
                    </div>
                    </div>
             
                    </div>
              
                    <Footer/>
            {/* agar setconfirmationmodal false hai  toh confirmationModalState nai dikhayega */}
            {confirmationalModalState &&  <ConfirmationModal modalData={confirmationalModalState}/>}
  
    </div>
  )
}
