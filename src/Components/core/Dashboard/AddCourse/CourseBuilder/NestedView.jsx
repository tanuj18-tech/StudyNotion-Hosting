import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import SubSectionModal from "./SubSectionModal"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
 // hamesha component ka naam capital se chaiye nahi toh react isko aam fucntion manega aur useSelector, useDispatch yeh sab use karne nai  dega
const NestedView = ({handleChangeEditSectionName}) => {

    const {token} = useSelector((state)=> state.auth);
    const {course} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
// console.log(state);
    // console.log("course  =  ",course);
     // view details ka tab 
   const [addSubSection, setAddSubsection] = useState(null)

    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModelState, setConfirmationModalState] = useState(null);

    const handleDeleteSection = async (sectionId) => {
            const result = await deleteSection(
                {
                sectionId,
                courseId: course._id
                },
                
               token) 
        
        
                    //   console.log("result = ",result);
            if(result){
                dispatch(setCourse(result));

            }

            //modal ko hata doh
            setConfirmationModalState(false);
        
        
        
        }
   
    

    const handleDeletesubSection =  async (subSectionId, sectionId) => {
        // console.log("handle delete = ",subSectionId);
        // console.log("hiiiiiiii");
        // 2 OBJECT MEH BHEJNA KYA EK HI DEKHLE PEHLE deleteSubSection meh
            const result = await deleteSubSection({
                subSectionId,
                sectionId,
                // token
            },token)

            if(result){
                // dispatch(setCourse(result));
                // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
            }

            setConfirmationModalState(false)
    }


    return (
      <div className=" rounded-lg bg-richblack-700 p-6 px-8">
          <div className=" text-white">
              {course?.courseContent?.map((section) => (
                  <details key={section._id}>
                      <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                          <div className=" flex items-center gap-x-3">
                              <RxDropdownMenu className="text-2xl text-richblack-50" />
                              <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                          </div>

                          <div className=" flex items-center gap-x-3">
                                <button onClick= {() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                      <MdEdit className="text-xl text-richblack-300"></MdEdit>
                                </button>

                                <button onClick={ () => {
                                    setConfirmationModalState({
                                        text1: "Delete this Section",
                                        text2: "All the lectures of this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModalState(false)
                                    })
                                }}>
                                    <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                </button>

                                <span  className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className=" text-xl fill-richblack-300"/>
                          </div>
                      </summary>

                                 <div className="px-6 pb-4">
               {/* Render All Sub Sections Within a Section */}
                                {
                                    section.subSection.map((data,key)=>(
                                        
                                        <div key={key} onClick={()=>  {
                                            console.log("CLICKED DATA = ", data);  
                                            // THIS IS ID DATA = 699453534443
                                            
                                            setViewSubSection(data)}}
                                            className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                        >
 {/* <pre>{JSON.stringify(data._id, null, 2)}</pre> */}
                                            
                                             <div className=" flex items-center gap-x-3 py-2">
                                                    <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                                    <p className="font-semibold text-richblack-50">{data?.title}</p>
                                                </div>



                                                {/* iss div ka onclick alag hai toh uparwala div ja clickk hora that toh yeh bhi  hogaya click
                                                iss liye stop propogation kiya taki, iss div meh na ho effect */}
                                                <div className=" flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                                                        <button onClick={ () => setEditSubSection({...data, sectionId:section._id})}>
                                                            <MdEdit/>
                                                        </button>
                                                        <button onClick={ ()=> setConfirmationModalState(
                                                            {
                                                         text1: "Delete this Sub Section",
                                                        text2: "Selected Lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeletesubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModalState(false)
                                                        })}>
                                                     <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                                                     
                                                    </div>



                                            </div>
                                    ))
                                }

                                {/* Add lecture */}
                                    {/* without backet () => kiya toh apne aap chal jayega */}
                                <button onClick={() => setAddSubsection(section._id)}
                                    className=" mt-3 flex items-center gap-x-1 text-yellow-50"
                                >
                                    <FaPlus className=" text-lg"/>
                                    <p>Add Lecture</p>
                                </button>
          
                    </div>
                        {/* {confirmationModel && <ConfirmationModal modalData = {confirmationModel}></ConfirmationModal>} */}
                  </details>
              ))}
          </div>

          {
            addSubSection ? (<SubSectionModal 
                modalData={addSubSection}
                setModalData={setAddSubsection}
                add = {true}
            />) : 
                viewSubSection ? (<SubSectionModal
                           modalData={viewSubSection}
                setModalData={setViewSubSection}
                view = {true}
                />) :
                editSubSection ? (<SubSectionModal
                           modalData={editSubSection}
                setModalData={setEditSubSection}
                edit = {true}
                />) :
                (<div></div>)

          }

          {
            confirmationModelState ? (<ConfirmationModal modalData={confirmationModelState}/>) : (<div></div>)
          }
      </div>

      
    )
}

export default NestedView;


















// import { useState } from "react"
// import { AiFillCaretDown } from "react-icons/ai"
// import { FaPlus } from "react-icons/fa"
// import { MdEdit } from "react-icons/md"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { RxDropdownMenu } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   deleteSection,
//   deleteSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import ConfirmationModal from "../../../../common/ConfirmationModal"
// import SubSectionModal from "./SubSectionModal"

// export default function NestedView({ handleChangeEditSectionName }) {
//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   // States to keep track of mode of modal [add, view, edit]
//   const [addSubSection, setAddSubsection] = useState(null)
//   const [viewSubSection, setViewSubSection] = useState(null)
//   const [editSubSection, setEditSubSection] = useState(null)
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   const handleDeleleSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id,
//       token,
//     })
//     if (result) {
//       dispatch(setCourse(result))
//     }
//     setConfirmationModal(null)
//   }

//   const handleDeleteSubSection = async (subSectionId, sectionId) => {
//     const result = await deleteSubSection({ subSectionId, sectionId, token })
//     if (result) {
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setConfirmationModal(null)
//   }

//   return (
//     <>
//       <div
//         className="rounded-lg bg-richblack-700 p-6 px-8"
//         id="nestedViewContainer"
//       >
//         {course?.courseContent?.map((section) => (
//           // Section Dropdown
//           <details key={section._id} open>
//             {/* Section Dropdown Content */}
//             <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
//               <div className="flex items-center gap-x-3">
//                 <RxDropdownMenu className="text-2xl text-richblack-50" />
//                 <p className="font-semibold text-richblack-50">
//                   {section.sectionName}
//                 </p>
//               </div>
//               <div className="flex items-center gap-x-3">
//                 <button
//                   onClick={() =>
//                     handleChangeEditSectionName(
//                       section._id,
//                       section.sectionName
//                     )
//                   }
//                 >
//                   <MdEdit className="text-xl text-richblack-300" />
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmationModal({
//                       text1: "Delete this Section?",
//                       text2: "All the lectures in this section will be deleted",
//                       btn1Text: "Delete",
//                       btn2Text: "Cancel",
//                       btn1Handler: () => handleDeleleSection(section._id),
//                       btn2Handler: () => setConfirmationModal(null),
//                     })
//                   }
//                 >
//                   <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                 </button>
//                 <span className="font-medium text-richblack-300">|</span>
//                 <AiFillCaretDown className={`text-xl text-richblack-300`} />
//               </div>
//             </summary>
//             <div className="px-6 pb-4">
//               {/* Render All Sub Sections Within a Section */}
//               {section.subSection.map((data) => (
//                 <div
//                   key={data?._id}
//                   onClick={() => setViewSubSection(data)}
//                   className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
//                 >
//                   <div className="flex items-center gap-x-3 py-2 ">
//                     <RxDropdownMenu className="text-2xl text-richblack-50" />
//                     <p className="font-semibold text-richblack-50">
//                       {data.title}
//                     </p>
//                   </div>
//                   <div
//                     onClick={(e) => e.stopPropagation()}
//                     className="flex items-center gap-x-3"
//                   >
//                     <button
//                       onClick={() =>
//                         setEditSubSection({ ...data, sectionId: section._id })
//                       }
//                     >
//                       <MdEdit className="text-xl text-richblack-300" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setConfirmationModal({
//                           text1: "Delete this Sub-Section?",
//                           text2: "This lecture will be deleted",
//                           btn1Text: "Delete",
//                           btn2Text: "Cancel",
//                           btn1Handler: () =>
//                             handleDeleteSubSection(data._id, section._id),
//                           btn2Handler: () => setConfirmationModal(null),
//                         })
//                       }
//                     >
//                       <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               {/* Add New Lecture to Section */}
//               <button
//                 onClick={() => setAddSubsection(section._id)}
//                 className="mt-3 flex items-center gap-x-1 text-yellow-50"
//               >
//                 <FaPlus className="text-lg" />
//                 <p>Add Lecture</p>
//               </button>
//             </div>
//           </details>
//         ))}
//       </div>
//       {/* Modal Display */}
//       {addSubSection ? (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubsection}
//           add={true}
//         />
//       ) : viewSubSection ? (
//         <SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           view={true}
//         />
//       ) : editSubSection ? (
//         <SubSectionModal
//           modalData={editSubSection}
//           setModalData={setEditSubSection}
//           edit={true}
//         />
//       ) : (
//         <></>
//       )}
//       {/* Confirmation Modal */}
//       {confirmationModal ? (
//         <ConfirmationModal modalData={confirmationModal} />
//       ) : (
//         <></>
//       )}
//     </>
//   )
// }