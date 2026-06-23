import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconBtn } from '../../common/IconBtn'

export const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    console.log("user = ",user);
    // console.log("user additional about chaiyeee ",user.additionalDetails.about);
    const navigate = useNavigate();
  return (
    <div className='text-white w-[900px] mx-auto'>
        <h1 className="mb-4 text-3xl font-medium text-richblack-5 -mt-2">My Profile</h1>



          {/* right side ka paila part */}
        <div className="flex items-center gap-x-80 w-full rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-8">

         
          <div className="flex items-center gap-x-4">
            <img src= {user?.image} alt= {`${user?.firstName}`} className=' aspect-square w-[78px] bg-yellow-5 text-black rounded-full object-cover'></img>
           
           
            <div className="space-y-1">
              <p    className="text-lg font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>
          </div>
          {/* It always starts from the root (/) of your app. */}
          {/* /dashboard/settings" */}
                      {/* You wrote:

            navigate("dashboard/settings")

            This is a relative path.

            👉 React Router says:

            “Start from current URL and append this” */}
            <div className='ml-[250px]'>
                         <IconBtn text= "Edit" type="button" onclickkkk={() => {navigate("/dashboard/settings")}}></IconBtn>
            </div>
          
        </div>

        {/* section 2 */}
        <div  className="my-10 flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-10">
            <div className="flex w-full items-center  gap-x-40">
                <p className="text-lg font-semibold text-richblack-5">About</p>
                <div className =' ml-[545px]'>
                                        <IconBtn   text= "Edit" onclickkkk = { () => navigate("/dashboard/settings")}></IconBtn>

                </div>
             </div>
                  <p       className={`${  user?.additionalDetails?.about  ? "text-richblack-5"  : "text-richblack-400"} text-sm font-medium`}>
                    {user?.additionalDetails?.about
                      ? user.additionalDetails.about
                      : "Write something about yourself"
                       }

                      
                  </p>

        </div>






  {/* section 3*/}
                        <div className="flex max-w-[100%] p-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 gap-x-52">
           <div className="flex flex-col gap-y-5">
            
             <div>
               <p className="mb-2 text-sm text-richblack-600">First Name</p>
               <p className="text-sm font-medium text-richblack-5">
                 {user?.firstName}
               </p>
             </div>
             <div>
               <p className="mb-2 text-sm text-richblack-600">Email</p>
               <p className="text-sm font-medium text-richblack-5">
                 {user?.email}
               </p>
             </div>
             <div>
               <p className="mb-2 text-sm text-richblack-600">Gender</p>
               <p className="text-sm font-medium text-richblack-5">
                 {user?.additionalDetails?.gender ?? "Add Gender"}
             </p>
             </div>
           </div>

           <div className="flex flex-col gap-y-5">
             <div>
               <p className="mb-2 text-sm text-richblack-600">Last Name</p>
               <p className="text-sm font-medium text-richblack-5">
                 {user?.lastName}
               </p>
             </div>
             <div>
               <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
               <p className="text-sm font-medium text-richblack-5">
                 {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
             </div>
             <div>
               <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                 {(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>


          </div>

                  <div className='ml-[90px]'>
                          <IconBtn text= "Edit" type="button" onclickkkk={() => {navigate("/dashboard/settings")}}></IconBtn>

                  </div>
 
        </div>
                 
                {/* <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                  <div className="flex w-full items-center justify-between">
                      <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                         <IconBtn text= "Edit" onclickkkk = { () => navigate("/dashboard/settings")}></IconBtn>
                  </div>

                  <div className="flex max-w-[500px] justify-between">
                    <p>First Name</p>
                    <p>{user?.firstName}</p>
                  </div>


                   <div>
                    <p>Email</p>
                    <p>{user?.email}</p>
                  </div>

                       <div>
                    <p>Gender</p>
                    <p>{user?.additionalDetails?.gender}</p>
                  </div>
                


                                  <div>
                    <p>Last Name</p>
                    <p>{user?.lastName}</p>
                  </div>
                    

                       <div>
                    <p>Contact Number</p>
                    <p>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add contact number"}</p>
                  </div>


                                             <div>
                    <p>Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth  ? user?.additionalDetails?.dateOfBirth : "Add your date of birth"}</p>
                  </div>

                </div> */}

               
    </div>
  )
}























// import { RiEditBoxLine } from "react-icons/ri"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { formattedDate } from "../../../utils/dateFormatter"
// import IconBtn from "../../common/IconBtn"

// export default function MyProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()

//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//         My Profile
//       </h1>
//       <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//           <div className="space-y-1">
//             <p className="text-lg font-semibold text-richblack-5">
//               {user?.firstName + " " + user?.lastName}
//             </p>
//             <p className="text-sm text-richblack-300">{user?.email}</p>
//           </div>
//         </div>
//         <IconBtn
//           text="Edit"
//           onclick={() => {
//             navigate("/dashboard/settings")
//           }}
//         >
//           <RiEditBoxLine />
//         </IconBtn>
//       </div>
//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-richblack-5">About</p>
//           <IconBtn
//             text="Edit"
//             onclick={() => {
//               navigate("/dashboard/settings")
//             }}
//           >
//             <RiEditBoxLine />
//           </IconBtn>
//         </div>
//         <p
//           className={`${
//             user?.additionalDetails?.about
//               ? "text-richblack-5"
//               : "text-richblack-400"
//           } text-sm font-medium`}
//         >
//           {user?.additionalDetails?.about ?? "Write Something About Yourself"}
//         </p>
//       </div>
//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-richblack-5">
//             Personal Details
//           </p>
//           <IconBtn
//             text="Edit"
//             onclick={() => {
//               navigate("/dashboard/settings")
//             }}
//           >
//             <RiEditBoxLine />
//           </IconBtn>
//         </div>


//         <div className="flex max-w-[500px] justify-between">
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">First Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.firstName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Email</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.email}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Gender</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.additionalDetails?.gender ?? "Add Gender"}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Last Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.lastName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {formattedDate(user?.additionalDetails?.dateOfBirth) ??
//                   "Add Date Of Birth"}
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   )
// }