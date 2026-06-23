import React from 'react'
import { CTAbutton } from './CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
export const CodeBlock = ({position, heading, subheading, ctabtn1, ctabtn2, Codeblock, backgoundGradient, codeColor}) => {
  return (
    <div className={`flex ${position}    my-20 w-[90%] mx-auto justify-between   gap-14`}> 

        {/* section 1 left part */}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

                <div className='flex gap-7 mt-7'>
                        <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                            <div className='flex gap-2 items-center'>
                                        {ctabtn1.btnText}

                                        <FaArrowRight></FaArrowRight>
                            </div>
                        </CTAbutton>


                          <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                                         {ctabtn2.btnText}                 
                                         
                           </CTAbutton>
                </div>
        </div>

         {/* section 2 RIGHT PART ANIMATION PART FULL YEH NECHE WALA DIV*/}
     
         <div className={ ` flex relative w-[450px] text-sm gap-2 p-3 border-pure-greys-500  border-[1px] border-t border-l shadow-[10px_0px_15px_rgba(0,0,0,0.3)] `}>
            
  

                 {/* BG Gradient */}
                <div
                className={`absolute w-[300px] h-[250px] -top-10 rounded-full blur-2xl  ${backgoundGradient} opacity-20`}
                ></div>

            <div className='text-center  flex flex-col text-richblack-400 font-bold font-inter'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
            </div>

            <div className= {`w-full flex flex-col font-bold font-mono pr-2 ${codeColor}`}>
                    <TypeAnimation
                        // 100 is pausing seconds 0.1sec kitne der rukna chaiya before every line
                         sequence = {[Codeblock, 100, ""]}
                         speed={80}
                         repeat = {Infinity}
                         cursor = {true}
                          style={
                            {
                                // keeps line breaks (\n)
                                whiteSpace : "pre-line",
                             }
                         }

                         omitDeletionAnimation = {true}
                    ></TypeAnimation>
            </div>

         </div>
 
    </div>
  
  )
}
