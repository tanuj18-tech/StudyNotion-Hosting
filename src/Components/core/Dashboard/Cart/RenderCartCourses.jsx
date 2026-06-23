import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { IoStarSharp } from "react-icons/io5";
import { removeFromCart } from "../../../../slices/cartSlice"
import { use } from "react";


 const RenderCartCourses = () => {
    const {cart} = useSelector((state)=> state.cart);
    const dispatch = useDispatch();
  return (
    <div className="flex flex-1 flex-col">
          {
            cart.map((course,indx)=> {
              return (
                
                <div key={indx}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
                >
                    <div  className="flex flex-1 flex-col gap-4 xl:flex-row">
                      <img src= {course?.thumbnail}
                       className="h-[148px] w-[220px] rounded-lg object-cover"
                      ></img>
                      <div className="flex flex-col space-y-1">
                        <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-300">{course?.category?.name}</p>


                                <div className="flex items-center gap-2">
                          <p className="text-yellow-5">4.8</p>
                           {/* npm i react-rating-stars-component */}
                          <ReactStars
                          // How many total stars you want
                            count = {5}
                            //Size of stars (in px)
                            size = {20}
                            // Should you be able to select rating or just see rating (for reusability)
                            edit = {false}
                            // Color of selected or active star
                            activeColor = "#ffd700"
                            emptyIcon = {<IoStarSharp/>}
                            fullIcon = {<IoStarSharp/>}
                          />

                            {/* Ids ka length is no of people who have reviewed */}
                            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Reviews</span>
                          </div>
                        </div>

                 
                    </div>

                    

                        <div className="flex flex-col items-end space-y-2">
                            <button
                             className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                            // onClick={dispatch(removeFromCart(course._id))}>
                            onClick={() => dispatch(removeFromCart(course._id))}>
                                <RiDeleteBin6Line/>
                                <span>Remove</span>
                            </button>
                            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course.price}</p>
                        </div>
                </div>

           
              )
            })
          }
    </div>
  )
}

export default RenderCartCourses;
// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   return (
//     <div className="flex flex-1 flex-col">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className={`flex w-full flex-wrap items-start justify-between gap-6 ${
//             indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
//           } ${indx !== 0 && "mt-6"} `}
//         >
//           <div className="flex flex-1 flex-col gap-4 xl:flex-row">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName}
//               className="h-[148px] w-[220px] rounded-lg object-cover"
//             />
//             <div className="flex flex-col space-y-1">
//               <p className="text-lg font-medium text-richblack-5">
//                 {course?.courseName}
//               </p>
//               <p className="text-sm text-richblack-300">
//                 {course?.category?.name}
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-5">4.5</span>
//                 <ReactStars
//                   count={5}
//                   value={course?.ratingAndReviews?.length}
//                   size={20}
//                   edit={false}
//                   activeColor="#ffd700"
//                   emptyIcon={<FaStar />}
//                   fullIcon={<FaStar />}
//                 />
//                 <span className="text-richblack-400">
//                   {course?.ratingAndReviews?.length} Ratings
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-end space-y-2">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
//             >
//               <RiDeleteBin6Line />
//               <span>Remove</span>
//             </button>
//             <p className="mb-6 text-3xl font-medium text-yellow-100">
//               ₹ {course?.price}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }