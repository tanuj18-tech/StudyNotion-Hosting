import { useState } from "react";
import { useEffect } from "react";
const RequirementField = ({name, label, register, errors, setValue, getValues }) => {
  // console.log(" errorrs = ",errors);
    const [requirement, setrequirement] = useState("");
    const [requirementList, setrequirementList] = useState([]);

//     requirementList → your current state array
// ...requirementList → spreads (copies) all existing elements
// requirement → the new item you want to add
// [...requirementList, requirement] → creates a new array with old + new item
// setrequirementList(...) → updates the state with this new array
    const handleAddRequirement = () => {
        if(requirement){
          // spread it's like copying elements one by one from an array into  a new array
          // now ...requirements is a new array and requirement gets added in this new array
          // and it is set in  the function
          setrequirementList([...requirementList, requirement]);
          setrequirement("");
        }
        
    }


      useEffect(() => {
    register(name, { required: true });
  }, []);
    useEffect(() => {
  setValue(name, requirementList);
}, [requirementList]);

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementList];
        // Removes 1 element at position index from the array.
        updatedRequirements.splice(index, 1);
        setrequirementList(updatedRequirements);
    }
  return (
    <div className="flex flex-col gap-2" >

        <label htmlFor={name}  className="text-sm text-richblack-5" >{label}<sup>*</sup></label>
        <div>
          <input
              type="text"
              id={name}
              // “User will be able to see whatever he has written due to value”
              //value= "tanuj" // only  tanuj will be  displayed
              value={requirement}
              onChange={(e) =>  setrequirement(e.target.value)}
                
              //for  enter 
              // onKeyDown → runs when any key is pressed
              // onKeyDown={
              //   (e) => {
              //     if(  e.key === "Enter") handleAddRequirement();
              //    }
              // }
        className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
          ></input>

          <button type="button" onClick={handleAddRequirement}
             className="font-semibold text-yellow-50"
          >
            Add
          </button>
        </div>


        {
          requirementList.length > 0 && (
            <ul>
              {
                requirementList.map((requirement, index) => {
                  return (
                    <li key={index} className=" flex gap-x-2 items-center text-richblue-5">
                        <span>{requirement}</span>
                        <button type="button" onClick={()=>handleRemoveRequirement(index)} className=" ml-2 text-xs text-pure-greys-5"
>Clear</button>
 
                    </li>
                  )
                })
              }
            </ul>
          )
        }


        {
            // errors.{name} nai chaleg
             errors[name] && (
              <span className="text-xs text-pink-200">
                {label} is required
              </span>
            )
        }

 
    </div>
  )
}








export default RequirementField;





// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// export default function RequirementsField({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   getValues,
// }) 

//{
//   const { editCourse, course } = useSelector((state) => state.course)
//   const [requirement, setRequirement] = useState("")
//   const [requirementsList, setRequirementsList] = useState([])

//   useEffect(() => {
//     if (editCourse) {
//       setRequirementsList(course?.instructions)
//     }
//     register(name, { required: true, validate: (value) => value.length > 0 })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     setValue(name, requirementsList)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [requirementsList])

//   const handleAddRequirement = () => {
//     if (requirement) {
//       setRequirementsList([...requirementsList, requirement])
//       setRequirement("")
//     }
//   }

//   const handleRemoveRequirement = (index) => {
//     const updatedRequirements = [...requirementsList]
//     updatedRequirements.splice(index, 1)
//     setRequirementsList(updatedRequirements)
//   }

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       <div className="flex flex-col items-start space-y-2">
//         <input
//           type="text"
//           id={name}
//           value={requirement}
//           onChange={(e) => setRequirement(e.target.value)}
//           className="form-style w-full"
//         />
//         <button
//           type="button"
//           onClick={handleAddRequirement}
//           className="font-semibold text-yellow-50"
//         >
//           Add
//         </button>
//       </div>
//       {requirementsList.length > 0 && (
//         <ul className="mt-2 list-inside list-disc">
//           {requirementsList.map((requirement, index) => (
//             <li key={index} className="flex items-center text-richblack-5">
//               <span>{requirement}</span>
//               <button
//                 type="button"
//                 className="ml-2 text-xs text-pure-greys-300 "
//                 onClick={() => handleRemoveRequirement(index)}
//               >
//                 clear
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }