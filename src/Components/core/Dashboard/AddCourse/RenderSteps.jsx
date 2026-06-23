 
import { useSelector } from "react-redux"
import { FaCheckCircle } from "react-icons/fa";
import {CourseBuilderForm} from "./CourseBuilder/CourseBuilderForm"
import { CourseInformationForm } from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse/index"
export const RenderSteps = () => {
    // course meh initial step 1 diya hai  yani paila step 1 krna hai
    // main reducer meh course reducer ko add nai kiya tha isliye idhar step undefined arraaha tha
     const {step} = useSelector((state) => state.course);
     const {course} = useSelector((state)=> state.course)
    //  console.log("coure ===== ",course);
    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish Course"
        }
    ]

    return (
        <div className="relative mb-2 flex flex-col gap-y-5 w-full justify-between items-center">
            <div className="flex flex-row gap-x-12 w-full items-center justify-evenly">
                                {
                steps.map((ele,index)=>{
                    return (

                //         <div>

                //                         <div className=" gap-y-2 flex flex-col items-center " key = {index}>


                //                <div className= {`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === ele.id ? 
                //                     " bg-yellow-900 border-yellow-50 text-yellow-50" 
                //                     : " bg-richblack-800 text-richblack-300 border-richblack-700"}`}>
                //                 {
                //                     // agar step cross kiya toh..check mark kardo
                //                     step > ele.id ? (<FaCheckCircle className="font-bold text-richblack-900"/>) : (ele.id)
                //                 }
                //                 </div>

                                    
                //                 <div>
                //                     {
                //                          <div>
                //                             <p              className={`text-sm ${
                //    step >= ele.id ? "text-richblack-5" : "text-richblack-500"
                // }`}>{ele.title}</p>
                //                             </div>
                //                     }

             
                //                 </div>

             
                //         </div>
                            


                //                      <div className=" bg-white w-[100px] h-[100px]">
                //                                                        {
                //                 ele.id !== steps.length && (
                //                                 <>
                //                                 <div
                //                                     className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-4 ${
                //                                     step >= ele.id  ? "border-yellow-50" : "border-white"
                //                                     } `}
                //                                 ></div>
                //                                 </>
                //                  )}
                //                 </div>

                //             </div>
             

                
         <div className="flex items-center" key={index}>
  
  {/* Step Circle + Title */}
  <div className="flex flex-col w-[80px] h-[100%] items-center relative">
    
    {/* Circle */}
    <div
      className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
        step === ele.id
          ? "bg-yellow-900 border-yellow-50 text-yellow-50"
          : "bg-richblack-800 text-richblack-300 border-richblack-700"
      }`}
    >
      {step > ele.id ? (
        <FaCheckCircle className="font-bold text-yellow-5" />
      ) : (
        ele.id
      )}
    </div>

    {/* Title */}
    <p
      className={`text-sm mt-2 w-[100%] text-center ${
        step >= ele.id ? "text-richblack-5" : "text-richblack-500"
      }`}
    >
      {ele.title}
    </p>

    {/* Connector Line */}
    {ele.id !== steps.length && (
         <div
                                                     className={`h-[calc(34px/2)] w-[200px] absolute left-[63px]  border-dashed border-b-4 ${
                                                     step > ele.id  ? "border-yellow-50" : "border-richblack-700"
                                                    } `}
                                            ></div>
    )}
  </div>

</div>
                    )
                })
            }
            </div>
 

            <div>

              {step===1 && <CourseInformationForm/> }
              {step ===2 &&  <CourseBuilderForm/>}
             {step==3 && <PublishCourse/>} 
            </div>
 
        </div>
    )
}
// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-richblack-900" />
//                 ) : (
//                   item.id
//                 )}
//               </button>
              
//             </div>
//             {item.id !== steps.length && (
//               <>
//                 <div
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}
//                 ></div>
//               </>
//             )}
//           </>
//         ))}
//       </div>

//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>
//       {/* Render specific component based on current step */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 &&  <PublishCourse /> }
//     </>
//   )
// }