import React from 'react'
import { HighlightText } from "../HomePage/HighlightText"
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithothres from "../../../assets/Images/Compare_with_others.png"
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png"
import { CTAbutton } from './CTAbutton'

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-3 mb-20 mt-[50px] items-center'>
            <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife for
                    <HighlightText text = {" learning any language"}></HighlightText>
            </div>

            <div className='text-center mx-auto text-richblack-600 text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex items-center justify-center mt-5 mx-auto'>
                    <img src = {knowYourProgress} className='objectcontain  -mr-32'></img>
                     <img src = {compareWithothres} className='objectcontain'></img>
                      <img src = {planYourLesson} className='objectcontain -ml-36'></img>
            </div>

            <div>
                <CTAbutton active={true} linkto={"/signup"}>Sign up</CTAbutton>
            </div>
    </div>
  )
}
