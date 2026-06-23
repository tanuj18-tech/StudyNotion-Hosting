import React from 'react'

export const IconBtn = ({text, onclickkkk, children, disabled, outline, customClasses, type}) => {
  return (
      <button
        
        disabled = {disabled} onClick={onclickkkk} type={type}   className={`flex items-center 
          ${ outline ? "border text-yellow-50 border-yellow-5 bg-transparent" : "bg-yellow-50" } 
          //  styling bhi bhej  skta hai (customClasses)
          cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}>

          {
            children ? (
              <>
              
                <span>
                {text}
              </span>
              {children}
              
              </>
 
            ) : (text)
          }
        </button>
  )
}




















// export default function IconBtn({
//     text,
//     onclick,
//     children,
//     disabled,
//     outline = false,
//     customClasses,
//     type,
//   }) {
//     return (
//       <button
//         disabled={disabled}
//         onClick={onclick}
//         className={`flex items-center ${
//           outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
//         } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
//         type={type}
//       >
//         {children ? (
//           <>
//             <span className={`${outline && "text-yellow-50"}`}>{text}</span>
//             {children}
//           </>
//         ) : (
//           text
//         )}
//       </button>
//     )
//   }