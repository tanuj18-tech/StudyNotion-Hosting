import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/core/Dashboard/Sidebar';
// sada export kiya hai (neeche) toh sada importing , no bracket and all
export const Dashboard = () => {
  //dono loading alag hai toh unki  naming kardi
    const {loading: authLoading} = useSelector((state)=> state.auth);
    const {loading: profileLoading} = useSelector((state) => state.auth);

    if(authLoading || profileLoading){
      return (
        <div className='spinner mt-10'>
            
        </div>
      )
    }
  return (
    // Total height = Navbar(3.5rem) + Content = Full screen
    // minimum height (min-h-[]), So the element will be at least this tall, but can grow bigger if needed
    <div className='relative flex min-h-[calc(100vh-3rem)] '>
         <Sidebar/>
          <div className=' h-[100%]'>
                                {/* This div:

                    Can be smaller than 1000px
                    But never larger than 1000px */}
              <div className='   w-[80vw] ml-10 mx-auto py-4'>
                          <Outlet/>
              </div>
          </div>
    </div>
  )
}
