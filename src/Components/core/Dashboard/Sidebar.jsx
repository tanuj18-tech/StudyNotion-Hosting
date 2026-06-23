import React, { useState } from 'react'
import { sidebarLinks } from "../../../data/dashboard-links"
 import {logout} from "../../../services/operations/authAPI"
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "../../common/ConfirmationModal"
  const Sidebar = () => {
    const {user} = useSelector((state) => state.profile);
    const {loading: profileLoading} = useSelector((state) => state.profile);
        const {loading: authLoading} = useSelector((state) => state.auth);
      
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [confirmationModal, setConfirmationModal] = useState(null);
        if(authLoading || profileLoading){
      return (
        <div className='spinner mt-10'></div>
      )
    }
  return (
    <div>
      <div className='flex min-w-[200px] flex-col  h-[100%] bg-richblack-800 py-8'>
          <div className='flex flex-col'>
              {
                sidebarLinks.map((ele)=> {
                    if(ele.type && user?.accountType !== ele.type)  return null;
                    return (
                         <SidebarLink link = {ele} iconName = {ele.icon} key={ele.id}></SidebarLink>
                     )
                })
              }
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>


                {/* iske liye array nai hai khud banana padega */}
               <div className='flex flex-col'>
                  <SidebarLink link = {{name: "Settings", path: "dashboard/settings"}} iconName="VscSettingsGear"></SidebarLink>

                    <button onClick ={ () => setConfirmationModal(
                     
                     
                          {
                            text1: "are you sure?",
                            text2: "you will be logged out of your account",
                            btn1Text : "Logout",
                            btn2Text: "Cancel",
                            
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                          }

 
                    )}      className = 'text-sm font-medium text-richblack-300'>

                      {/* icon aur text keliye */}
                          <div className='flex  px-8 py-2 text-sm font-medium items-center gap-x-2'>
                            <VscSignOut className='text-lg'></VscSignOut>
                            <span>Logout</span>
                          </div>
                    </button>
          </div>
      </div>  

      {confirmationModal && <ConfirmationModal modalData = {confirmationModal}></ConfirmationModal>}
    </div>
  )
}

export default Sidebar;