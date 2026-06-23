import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from "../services/operations/authAPI"
import { FaAlignLeft } from 'react-icons/fa';
import { BiArrowBack } from "react-icons/bi"
export const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
      e.preventDefault();
      dispatch(getPasswordResetToken(email, setEmailSent));
    }
  return (
    <div className=' text-white h-[664px] flex justify-center items-center'>
        {
            loading ? (<div className='spinner'></div>) : 
            (<div className='flex flex-col gap-y-3 w-[430px] p-2'>
                <h1 className=' font-semibold text-[1.875rem] mb-2 leading-[2.375rem]'>
                  {
                    !emailSent ? "Reset Your Password" : "Check Your Email"
                  }
                </h1>

                <p className='text-[1.235rem] mb-2 leading-[1.625rem] text-richblack-100'>
                  {
                    !emailSent? 
                    "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                    : `We have sent reset email to ${email}`
                  }
                </p>

                <form onSubmit={handleOnSubmit}>
                  {
                     !emailSent && (
                        <label>
                          <p className=' text-[0.875rem] mb-1'>Email Address <sup className=' text-pink-200'>*</sup></p>
                            <input
                              required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your email Address'
                              className=' w-[100%] p-2 rounded-md bg-richblack-800 default:border-none mb-3 text-white'
                            >
                            </input>
                        </label>
                     ) 
                  }

                                 <button  type='submit' className='mb-2 bg-yellow-50 mt-2 text-black p-2 w-full rounded-md'>
                              {
                                !emailSent ? "Reset Password" : "Resend Email"
                              }
                            </button>

                            <div className='mt-2  hover:underline'>
                              <Link to={"/login"} className='flex gap-x-1'>
                               <p className="flex items-center gap-x-1 text-richblack-5">
                                 <BiArrowBack /> Back To Login
                                </p>
                              </Link>
                            </div>
                </form>
            </div>)
        }
    </div>
  )
}










// import { useState } from "react"
// import { BiArrowBack } from "react-icons/bi"
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// import { getPasswordResetToken } from "../services/operations/"

//function ForgotPassword() {
  // const [email, setEmail] = useState("")
  // const [emailSent, setEmailSent] = useState(false)
  // const dispatch = useDispatch()
  // const { loading } = useSelector((state) => state.auth)

  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(getPasswordResetToken(email, setEmailSent))
  // }

 // return (
    // <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
    //   {loading ? (
    //     <div className="spinner"></div>
    //   ) : (
    //     <div className="max-w-[500px] p-4 lg:p-8">
    //       <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
    //         {!emailSent ? "Reset your password" : "Check email"}
    //       </h1>
    //       <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
    //         {!emailSent
    //           ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
    //           : `We have sent the reset email to ${email}`}
    //       </p>
    //       <form onSubmit={handleOnSubmit}>
    //         {!emailSent && (
    //           <label className="w-full">
    //             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    //               Email Address <sup className="text-pink-200">*</sup>
    //             </p>
    //             <input
    //               required
    //               type="email"
    //               name="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               placeholder="Enter email address"
    //               className="form-style w-full"
    //             />
    //           </label>
    //         )}
    //         <button
    //           type="submit"
    //           className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
    //         >
    //           {!emailSent ? "Sumbit" : "Resend Email"}
    //         </button>
    //       </form>
    //       <div className="mt-6 flex items-center justify-between">
    //         <Link to="/login">
    //           <p className="flex items-center gap-x-2 text-richblack-5">
    //             <BiArrowBack /> Back To Login
    //           </p>
    //         </Link>
    //       </div>
    //     </div>
    //   )}
    // </div>
  //)
//}

export default ForgotPassword