import React from 'react'
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
export const CourseCard = ({cardData,currentCard, setCurrentCard}) => {
  return (
    <div className={ `${cardData.heading===currentCard? "bg-white text-black  shadow-[12px_12px_0_0] shadow-yellow-50 " : "bg-richblack-800"} flex flex-col cursor-pointer gap-3 py-3 h-[290px] `}
    
        onClick={()=>{setCurrentCard(cardData.heading)}}
    >

                        <div className='border-richblack-300 border-b-[2px] border-dashed w-[100%] px-8 h-[90%] py-3'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-xl font-bold'>{cardData.heading}</p>
                                <p className='text-richblack-300 w-[80%]'>{cardData.description}</p>
                            </div>
                        </div>
            

            <div className={`${cardData.heading===currentCard? "text-blue-300": "text-richblack-400"} flex font-semibold justify-between items-center px-6 mb-4  `}>
                <div className='flex gap-2 items-center'>
                    <HiUsers></HiUsers>
                     <p>{cardData.level}</p>
                </div>
                <div className='flex gap-1 items-center '>
                    <ImTree></ImTree>
                    {cardData.lessionNumber}
                    <p>Lessons</p>
                </div>
            </div>
    </div>
  )
}
