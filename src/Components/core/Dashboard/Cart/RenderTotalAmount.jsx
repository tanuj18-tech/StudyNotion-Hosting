import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {IconBtn} from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import { use } from "react"


 const RenderTotalAmount = () => {
  //total amount of all the courses
  // BSDK AESA MAT KARRRR 
  // state.cart.total ayega
  //KITNA TIME KHAYA ISNEH.....
    // const {total} = useSelector((state)=> state.total);
    const { total } = useSelector((state) => state.cart)
  const {cart} = useSelector((state) => state.cart)
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)
    const handleBuyCourse = () => {
 
      const courses = cart.map((course) => course._id);
      buyCourse(token, courses, user, navigate, dispatch)
      console.log("Bought these courses ",courses);
     }
 

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total: </p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

        <button onClick = {handleBuyCourse}  className = "w-full bg-yellow-50 rounded-md font-bold text-black px-3 py-2 justify-center" > Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount;



 