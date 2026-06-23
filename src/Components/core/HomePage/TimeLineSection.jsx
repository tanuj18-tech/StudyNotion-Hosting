import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import timelineImage from "../../../assets/Images/TimelineImage.png"
const timeline = [
    {
        logo: Logo1,
        heading: "leadership",
        description: "Fully completed to the success company"
    },
        {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
        {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
        {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]
export const TimeLineSection = () => {
  return (
    <div>
            <div className='flex flex-row gap-20 items-center'>
                {/*left side*/}
                <div className='flex flex-col w-[45%] gap-5 relative'>
                    {
                          timeline.map((element, index)=>{
                                return (
                                    <div key={index}>   
                                             <div  className='flex gap-5 h-[70px]'>
                                                    <div  className='w-[50px] h-[50px] bg-white justify-center rounded-full flex items-center'>
                                                        <img src= {element.logo} alt='logo'></img>
                                                    </div>

                                                        <div>
                                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                                        <p className='text-base'>{element.description}</p>
                                                        </div>
                                               </div>

                                     

                                            <div  className={`${timeline.length -1===index? "" : "border-black border-dotted border-r"}   h-[50px] w-[5%]`}>
                                                <p></p>
                                                </div>

                                                
                                    </div>
                    
                                )
                        })

                
                    }
 
              
                </div>


                                     {/*right side*/}
                    <div  className='relative shadow-blue-200 shadow-[-4px_-4px_40px_rgba(59,130,246,0.4)] -mt-16'>
                            <img src={timelineImage}  alt='timeLineImage'></img>
                            <div className='absolute bg-white h-[20px] left-6 w-[614px]'></div>
                             <div className='absolute bg-white h-[450px] top-6 -right-5 w-[20px]'></div>


                             <div className='absolute translate-x-[15%] translate-y-[-40%] w-[80%] bg-caribbeangreen-700 text-white flex flex-row py-6 uppercase'>
                                    <div className='flex flex-row gap-5 items-center px-7 border-r border-caribbeangreen-300'>
                                        <p className='text-3xl font-bold'>10</p>
                                        <p className='text-caribbeangreen-300 text-sm'>Years of Expereince</p>
                                    </div>
                                    <div className='flex gap-5 items-center px-7'>
                                            <p className='text-3xl font-bold'>250</p>
                                        <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>

                                    </div>
                             </div>
                    </div>
            </div>
    </div>

  
  )
}
