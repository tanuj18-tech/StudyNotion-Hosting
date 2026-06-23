import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { HighlightText } from '../Components/core/HomePage/HighlightText'
import { CTAbutton } from '../Components/core/HomePage/CTAbutton'
import Banner from "../assets/Images/banner.mp4";
import { CodeBlock } from '../Components/core/HomePage/CodeBlock'
import { TimeLineSection } from '../Components/core/HomePage/TimeLineSection'
import { LearningLanguageSection } from '../Components/core/HomePage/LearningLanguageSection'
import { InstructorSection } from "../Components/core/HomePage/InstructorSection"
 import {Footer} from "../Components/common/Footer"
import { ExploreMore } from '../Components/core/HomePage/ExploreMore'
import ReviewSlider from '../Components/common/ReviewSlider'
 export const Home = () => {
  return (
    <div>
        {
            //section 1
        }

        <div className='relative mx-auto mt-20 flex flex-col  h-max w-11/12 text-white  items-center justify-between'>
            <Link to={"/signup"}>
                
                <div className='group  p-1 rounded-full font-bold text-richblack-200 bg-richblack-800 mx-auto  transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex items-center border-pure-greys-300  p-1 gap-2 py-[5px] px-10 rounded-full group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight></FaArrowRight>
                    </div>
                </div>
            </Link>

            <div className='text-4xl text-center font-semibold mt-7'>
                Empower Your Future With <HighlightText text = {"Coding Skills"}></HighlightText>
            </div>

            <div className='w-[70%] text-center text-lg text-richblack-300 font-bold mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row mt-8 gap-7'>
                 {/* as a prop meh pass karahaa hu link to  */}
                <CTAbutton active={true} linkto={"/signup"}>
                    Learn More
                </CTAbutton>

                <CTAbutton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAbutton>
            </div>

                <div className='mt-20 mx-3 w-[90%] shadow-[-4px_-4px_100px_rgba(59,130,246,0.4)] relative -4px my-11'>
                        <video loop muted autoPlay>
                                <source src= {Banner} type = "video/mp4" ></source>
                        </video>


                        <div className='absolute bg-white h-[20px] left-6 w-[1263px]'></div>
                             <div className='absolute bg-white h-[700px] top-6 -right-5 w-[20px]'></div>
                </div>

                {/* animation section 1 */}

                <div> 
                    <CodeBlock position={"lg:flex-row"}
                        heading={
                             <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={" coding potential"}></HighlightText> with our online courses
                            </div>
                        }

                        subheading={
                            <div>
                                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                            </div>
                        }

                        ctabtn1={
                            {
                                btnText:  "Try it Yourself",
                                active: true,
                                linkto : "/signup"
                            }
                        }

                                        ctabtn2={
                            {
                                btnText:  "Learn More",
                                active: false,
                                linkto : "/login"
                            }
                        }

                        Codeblock={`<!DOCTYPE html>\n<html lang="en">
                                                <head>
                                            <title>This is myPage</title>
                                        </head>
                                          <body>
                                            <h1><a href="/">Header</a></h1>
                                            <nav>
                                                <a href="/one">Ones</a>
                                                <a href="/two">Two</a>
                                                <a href="/three">Three</a>
                                            </nav>
                                        </body>`
                                    }

                        backgoundGradient = {"bg-[linear-gradient(123deg,#8A2BE2,orange,#f8f8ff)] opacity-20"}


                        codeColor={"text-yellow-100"}

                    ></CodeBlock>
                </div>
            


                      {/* animation section 2 */}

                <div> 
                    <CodeBlock position={"flex-row-reverse"}
                        heading={
                            <div className='text-4xl w-[50%] font-semibold'>
                                Start 
                                <HighlightText text={" coding in seconds"}></HighlightText> 
                            </div>
                        }

                        subheading={
                            <div className='w-[80%]'>
                                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.                            </div>
                        }

                        ctabtn1={
                            {
                                btnText:  "Continue Lesson",
                                active: true,
                                linkto : "/signup"
                            }
                        }

                                        ctabtn2={
                            {
                                btnText:  "Learn More",
                                active: false,
                                linkto : "/login"
                            }
                        }

                        Codeblock={`import CTAButton from "./Button";
                                             import TypeAnimation from "react-type";
                                           import { FaArrowRight } from "react-icons/fa";

                                       const Home = () => {
                                          return (
                                            <h1><a href="/">Header</a></h1>
                                            <nav>
                                                <div>Home</div>
                                               )
                                                <a href="/three">Three</a>
                                           }
                                        export default Home;`
                                    }

                        codeColor={"text-white"}

                        backgoundGradient = {"bg-[linear-gradient(123deg,#1D4ED8,#60A5FA,#DBEAFE)] opacity-45"}

                    ></CodeBlock>
                </div>


                    <ExploreMore></ExploreMore>

                    
        </div>
 

               {
            //section 2
        }

        <div className=' bg-pure-greys-5 py-5 -mt-24 text-richblack-700'>
          <div className='homepage_bg h-[313px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                                <CTAbutton active={true} linkto={"/signup"}>
                                    <div className='flex flex-row items-center gap-2'>
                                        Explore full Catalog
                                        <FaArrowRight></FaArrowRight>
                                    </div>
                                    
                                </CTAbutton>


                                             <CTAbutton active={false} linkto={"/signup"}>
                                    <div className='flex flex-row items-center gap-2'>
                                        Learn More
                                     </div>
                                    
                                </CTAbutton>
                        </div>
                </div>
         </div>



            <div className='w-11/12 mx-auto flex flex-col items-center max-w-maxContent gap-7'>
                 
                 
                    <div className='flex flex-row w-[100%] gap-[200px] mx-auto mb-20 mt-[110px]'>
                      
                      
                        <div className='text-4xl font-semibold w-[50%]'>
                            Get the skills you need for a <HighlightText text={" job that is in demand."}></HighlightText>
                        </div>
                      
                      
                      

                            <div className='flex flex-col gap-4 w-[50%]'>
                                    <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                                        <div className='w-[150px]'>
                                            <CTAbutton  active={true} linkto={"/signup"}>Learn More</CTAbutton>

                                        </div>
                             </div>
                    
                    </div>




                         <TimeLineSection></TimeLineSection>

                        <LearningLanguageSection></LearningLanguageSection>
                   
            </div>







           
        </div>




               {
            //section 3
        }

        <div className=' min-h-screen max-auto flex flex-col gap-8 bg-richblack-900 items-center justify-between text-white'>
                    <InstructorSection></InstructorSection>

                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
                <ReviewSlider />
        </div>
      
               {
            //section 4
        }
            <Footer></Footer>
     </div>
  )
}
