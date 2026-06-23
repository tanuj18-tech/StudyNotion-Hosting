 import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from "../../data/countrycode.json"
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
// npm i react-hook-form
  const ContactUsForm = () => {
    
     const {register,
      handleSubmit,
      reset,
      formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("logging data",data);
        try {
           const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
          // const response = {status: "OK"};
          toast.success("Form submitted successfully")
          console.log("logging response",response);
         } catch (error) {
          console.log("error ",error.message);
          toast.error("Failed in submitting form")
         }
    }
    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          email: "",
          firstname: "",
          lastname: "",
          message: "",
          phoneNo: ""
        })
      }
    },[isSubmitSuccessful]);
   return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7 mb-16'>
            <div className=' flex gap-x-5'>
              {/* first name */}
              <div className=' flex flex-col gap-2'>
                <label htmlFor='firstname' className='text-richblack-5 text-sm'>First Name</label>
                <input name='firstname' id='firstname' type='text' placeholder='Enter first name' 
                  {...register("firstname",{required:true})} className='text-white p-2 rounded-md bg-richblack-700 w-full'
                ></input>

                {
                  errors.firstname && (
                    <span>
                      Please enter your name
                    </span>
                  )
                }
              </div>


                            {/* last name */}
              <div className=' flex flex-col gap-2'>
                <label htmlFor='lastname' className='text-sm text-richblack-5'>last Name</label>
                <input name='lastname' id='lastname' type='text' placeholder='Enter last name' 
                  {...register("lastname")} className='text-white rounded-md w-full p-2 bg-richblack-700'
                ></input>
              {/* as it is not compulsory  so no need of error handling */}
                {/* {
                  errors.firstname && (
                    <span>
                      Please enter your name
                    </span>
                  )
                } */}
              </div>
             </div>

                           {/* email */}
              <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-sm text-richblack-5'>Email Addres</label>
                <input name='email' type='email' id='email' placeholder='enter email address' {...register("email", {required:true})} className='text-white rounded-md bg-richblack-700 p-2'></input>

                {
                  errors.email && (
                    <span>
                      Please enter your email address
                    </span>
                  )
                }
              </div>

                {/* phone no */}
                <div>
                  <label htmlFor='phonenumber' className='text-sm text-richblack-5 mb-2'>Phone Number</label>
                    <div className='flex gap-x-16 mt-2'>
                      {/* dropdown */}
                        <div className=' text-black !w-[30px]'>
                            <select name='dropdown' id='dropdown' className='w-[75px] px-3 py-3 rounded-md bg-richblack-700 text-white'
                              {...register("countrycode", {required:  true})}
                            >

                                             {
                              countryCode.map((element, index) => {
                                  return (
                                    <div>
                                        <option key={index} value={element.code}>
                                          
                                            {element.code} {"-"} {element.country}
                                          
                                        </option>
                                      </div>
                                  )
                              })
                            }



                            </select>

              
                        </div>

                        <div>
                          <input type='number' name='phonenumber' id='phonenumber' placeholder='12345 67890' 
                            className='text-white h-full p-2 w-[305px] rounded-md bg-richblack-700' {...register("phoneNo", 
                              // required true honi chaiye, nai hai  toh message yeh dikhado its all VALIDATON
                              {required:{value:true, message:"Please enter your phone Number"}, 
                              maxLength:{value:12, message: "Invalid Phone no"},
                            minLength:{value:8, message:"invalid phone no"}
                          })}
                          ></input>
                        </div>
                    </div>
                    {/* lets say koi error agaya */}
                        {
                          errors.phoneNo && (
                            <span>
                              {errors.phoneNo.message}
                            </span>
                          )
                        }
                  </div>


              {/* message box */}
              <div className='flex flex-col gap-2'>
                <label htmlFor='message' className='text-sm text-richblack-5'>Message</label>
                

                <textarea name='message' id='message' placeholder='Enter your message here' cols={30} rows={7}
                  {...register("message",{required: true})} className=' p-2 rounded-md bg-richblack-700 text-white'
                >

                </textarea>

                {
                  errors.message && (
                    <span className='text-black'>Please enter your message type.</span>
                  )
                }
              </div>
                  {/* button  */}

                  <button   type = 'submit' className = 'text-center text-[13px] px-6 py-3 bg-yellow-50 text-black border-pure-greys-100 border-[1px] rounded-md font-bold hover:scale-95 transition-all duration-200'>Send Message</button>
        </form>
   )
 }
 
  export default ContactUsForm;