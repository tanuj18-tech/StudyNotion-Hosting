import React from 'react'
import instructorImage from "../../../assets/Images/Instructor.png"
import {HighlightText} from "../HomePage/HighlightText"
import { CTAbutton } from './CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
export const InstructorSection = () => {
  return (
    <div className='mt-16 w-[1300px] mx-auto'> 
          <div className='flex gap-20 justify-center items-center'>
                <div className='w-[50%] relative '>
                    <div className='absolute bg-white h-[20px] -left-5 -top-5 w-[614px]'></div>
                             <div className='absolute bg-white h-[530px] top-0 -left-5 w-[20px]'></div>
                    <img className='h-full w-full' src = {instructorImage} ></img>
                  </div>

                    <div className='w-[50%] flex flex-col gap-10'>
                            <div className='text-4xl font-semibold w-[50%]'>
                                Become an 
                                <HighlightText text={" Instructor"}></HighlightText>
                            </div>

                            <p className='text-richblack-300 text-[16px] font-medium w-[85%]'>
                              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                            </p>

                            {/* The outer div shrinks to the exact width of the button content.*/}
                            <div className='w-fit'>
                                          <CTAbutton active={true} linkto={"/signup"}>
                                <div className='flex gap-2 justify-center  items-center'>
                                  Start Teaching Today
                                  <FaArrowRight></FaArrowRight>
                                </div>
                                     </CTAbutton>

                            </div>
                     
                    </div>
          </div>
    </div>
  )
}
