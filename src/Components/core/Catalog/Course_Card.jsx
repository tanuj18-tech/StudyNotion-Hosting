import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/GetAvgRating"
const Course_Card = ({course, Height}) => {
  console.log("instructor = ",course?.instructor.firstName);
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    console.log("courseee = ",course)
    const count = GetAvgRating(course.ratingAndReviews);
    console.log("count = ",count)


    console.log("ratingArr =", course?.ratingAndReviews);
console.log("avg =", GetAvgRating(course?.ratingAndReviews));
    setAvgReviewCount(count);
  }, [course]); 
  // jab jab course ayega tab tab yeh chala doh
    return (
      <div className=" mb-8">
          {/* course ke card par click krne par buy wale meh jata hai isliye link tag meh */}
          <Link to={`/courses/${course._id}`}>
              <div >
                <div className="rounded-lg">
                  <img src= {course?.thumbnail} alt="Course thumbnail" className= {`${Height} w-full rounded-xl object-cover`}/>
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                  <p className="text-xl text-richblack-5">{course.courseName}</p>
                  {/* profileId ka firstName, lastName */}
                  {/* INSTRUCTOR KA NAAM NAI  ARAHA KRNA HAI BASS ID ARAHI */}
                  <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgReviewCount? avgReviewCount: 0}</span>
                    <RatingStars Review_Count = {avgReviewCount} />
                    <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                  </div>
                  <p className="text-xl text-richblack-5">{course?.price}</p>
                </div>
              </div>
          </Link>
      </div>
    )
}

export default Course_Card;

// import React, { useEffect, useState } from 'react'
// import RatingStars from '../../common/RatingStars'
// import GetAvgRating from '../../../utils/avgRating';
// import { Link } from 'react-router-dom';

// const Course_Card = ({course, Height}) => {


//     const [avgReviewCount, setAvgReviewCount] = useState(0);

//     useEffect(()=> {
//         const count = GetAvgRating(course.ratingAndReviews);
//         setAvgReviewCount(count);
//     },[course])


    
//   return (
//     <>
//       <Link to={`/courses/${course._id}`}>
//         <div className="">
//           <div className="rounded-lg">
//             <img
//               src={course?.thumbnail}
//               alt="course thumnail"
//               className={`${Height} w-full rounded-xl object-cover `}
//             />
//           </div>
//           <div className="flex flex-col gap-2 px-1 py-3">
//             <p className="text-xl text-richblack-5">{course?.courseName}</p>
//             <p className="text-sm text-richblack-50">
//               {course?.instructor?.firstName} {course?.instructor?.lastName}
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-yellow-5">{avgReviewCount || 0}</span>
//               <RatingStars Review_Count={avgReviewCount} />
//               <span className="text-richblack-400">
//                 {course?.ratingAndReviews?.length} Ratings
//               </span>
//             </div>
//             <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
//           </div>
//         </div>
//       </Link>
//     </>
//   )
// }

// export default Course_Card
