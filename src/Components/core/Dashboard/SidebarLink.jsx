import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';


 const SidebarLink = ({link, iconName}) => {
  const location = useLocation();
  const Icon = Icons[iconName];
  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }
  return (
      <NavLink to={link.path} 
        className= {` relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-600"  : "bg-opacity-0"}`}
         //onclick
      >
        <span className= {`left-0 absolute top-0 h-full w-[0.15rem] bg-yellow-50  ${matchRoute(link.path) ? "bg-white": "bg-opacity-0"} `}>
        </span>

        <div className=' flex items-center gap-x-2'>
            <Icon className= {` ${matchRoute(link.path) ? "text-white": " text-richblack-50"} `}></Icon>
            <span className= {` ${matchRoute(link.path) ? "text-white": " text-richblack-50"} `}>{link.name}</span>
        </div>
      </NavLink>
  )
}

export default SidebarLink;