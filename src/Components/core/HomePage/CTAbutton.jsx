import React, { act } from 'react'
import { Link } from 'react-router-dom'
export const CTAbutton = ({children, active, linkto}) => {
  return (
        <Link to={linkto}>
            
                <div className= {`text-center text-[13px]   px-6 py-3 border-pure-greys-100 border-[1px] rounded-md font-bold hover:scale-95 transition-all duration-200  ${active ? "bg-yellow-50 text-black" : "bg-richblue-800"}` }>
                    {children}
                </div>
        </Link>
  )
}
