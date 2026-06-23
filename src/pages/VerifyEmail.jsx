import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import {sendOtp, signUp} from "../services/operations/authAPI"
import { RxCountdownTimer } from "react-icons/rx";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const {signupData,loading} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  // agar signup ka data nai  hai toh chale jao idhar se 
  useEffect( () => {
      if(!signupData){
        navigate("/signup");
      }
  }, [])

  const handleOnSubmit = (e) => {
      e.preventDefault();

      // destructure
      // signupData slices meh define kiya hai 
      const {
        accountType, 
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      } = signupData;
      dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }
  return (
    <div className='text-white flex justify-center items-center h-[664px]'>
        {
          loading? (<div className='spinner'></div>) :
          (<div className='p-2'>
              <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
              <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 w-[90%]'>A verification code has been sent to you. Enter the code below</p>
              <form  onSubmit={handleOnSubmit}>
                {/* npm i react-otp-input */}
 

  <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  renderSeparator={<span className=" text-white">-</span>}
  renderInput={(props) => (
    <input
      {...props}
                                          // ! matlab important override inner properties of this input
      className=" h-16 text-center text-lg !w-14 rounded-md bg-richblack-800 text-white border border-richblack-600 focus:outline-none focus:border-yellow-50"
    />
  )}
  containerStyle={{
    justifyContent : "space-evenly",
    gap: "5px",
  }}
/>

                <button type='submit' className='mt-6 w-full bg-yellow-50 text-black px-[12px] py-[12px] rounded-md'>
                  Verify Email
                </button>
              </form>


              <div className='mt-6 flex justify-between items-center'>

                <div   >
                                <Link to={"/login"} className='flex gap-2 items-center'>
                  <FaLongArrowAltLeft></FaLongArrowAltLeft>
                  <p className='  ring-richblack-5'>Back to Login</p>
                </Link>
                  </div>
   

                <div>
                    <button className='flex gap-2 items-center text-blue-100'  onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                      <RxCountdownTimer></RxCountdownTimer>
                      Resend it
                      </button>
                  </div>
                </div>

          </div>)
        }
    </div>
  )
}

























// import { useEffect, useState } from "react";
// import OtpInput from "react-otp-input";
// import { Link } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
// import { RxCountdownTimer } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/operations/authAPI";
// import { useNavigate } from "react-router-dom";

// function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const { signupData, loading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Only allow access of this route when user has filled the signup form
//     if (!signupData) {
//       navigate("/signup");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleVerifyAndSignup = (e) => {
//     e.preventDefault();
//     const {
//       accountType,
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//     } = signupData;

//     dispatch(
//       signUp(
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//         navigate
//       )
//     );
//   };

//   return (
//     <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
//       {loading ? (
//         <div>
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="max-w-[500px] p-4 lg:p-8">
//           <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
//             Verify Email
//           </h1>
//           <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
//             cation code has been sent to you. Enter the code below
//           </p>
//           <form onSubmit={handleVerifyAndSignup}>
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               renderInput={(props) => (
//                 <input
//                   {...props}
//                   placeholder="-"
//                   style={{
//                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                   }}
//                   className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
//                 />
//               )}
//               containerStyle={{
//                 justifyContent: "space-between",
//                 gap: "0 6px",
//               }}
//             />
//             <button
//               type="submit"
//               className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
//             >
//               Verify Email
//             </button>
//           </form>
//           <div className="mt-6 flex items-center justify-between">
//             <Link to="/signup">
//               <p className="text-richblack-5 flex items-center gap-x-2">
//                 <BiArrowBack /> Back To Signup
//               </p>
//             </Link>
//             <button
//               className="flex items-center text-blue-100 gap-x-2"
//               onClick={() => dispatch(sendOtp(signupData.email))}
//             >
//               <RxCountdownTimer />
//               Resend it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyEmail;