import  { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import {HighlightText} from "../HomePage/HighlightText" 
import { CourseCard } from './CourseCard';
 const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
]
export const ExploreMore = () => {
         const [currentTab, SetCurrentTab] = useState(tabsName[0]);
         const [courses, SetCourses] = useState(HomePageExplore[0].courses);
         const [currentCard, setCurrentCard]  = useState(HomePageExplore[0].courses[0].heading);

         const setMyCards = (value) => {
            SetCurrentTab(value);
            // filter() goes through every element of the array and keeps only those elements for which the condition is true.
            const result = HomePageExplore.filter((element) => element.tag === value);
            //result meh array aya of [{ tag: "Free", courses: "[..]" }, {tag: "Free", courses: "[..]"}]
            SetCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);
         }
    return (

    <div className='relative'>  
    <div>

        <div className='w-fit mx-auto'>
                            <div className='text-4xl font-bold text-center '>
                                    Unlock the <HighlightText text={"Power of code"}></HighlightText>
                              </div>

            <p className='text-[16px] text-richblack-300   text-center mt-3'>Learn to Build Anything You Can Imagine</p>

            <div className='flex flex-row mb-6 mt-6  border-richblack-400 border-b px-2 py-2 bg-richblack-800 rounded-full'>
                    {
                        tabsName.map((element, index) => {
                                return (
                                    <div className={`w-fit text-[16px] font-semibold flex flex-row items-center gap-2
                                     ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                                      : " text-richblack-200 "} 
                                      rounded-full transition-all duration-200 cursor-pointer
                                       hover:bg-richblack-900 hover:text-richblack-5 px-8 py-1`} onClick={()=> setMyCards(element)} key={index}>
                                            {element} 
                                        </div>
                                )
                        })
                    }
            </div>
{/* 
            <div className='lg:h-[150px]'>

            </div> */}
        </div>
 


</div>
            <div  className='absoulte w-[1400px]  flex mx-auto translate-y-8 justify-center   gap-16'>
                {
                    
                    courses.map( (element, index) => {
                            return (
                                        <CourseCard key = {index} cardData = {element} currentCard = {currentCard} setCurrentCard = {setCurrentCard} >

                                        </CourseCard>
                            )
                    })
                }
                </div>


                </div>
   )
}
