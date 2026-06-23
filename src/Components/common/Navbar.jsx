import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from "react-router-dom";
 import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { apiConnector } from "../../services/apiconnector"
import { useState } from "react";
import { useEffect } from "react";
import {categories} from "../../services/apis"
import {ProfileDropDown} from "../core/Auth/ProfileDropDown"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";



export function Navbar(){
        // useLocation() gives information about the current URL.
        // http://localhost:3000/dashboard/settings
        //locationnn.pathname = /dashboard/settings
        const locationnn = useLocation();
        const matchRouutee = (routeee) => {
            //Does the current URL match the route passed to this function?
            //matchPath({ path: "/dashboard/settings" }, "/dashboard/settings")
            return matchPath({path: routeee}, locationnn.pathname);
        }

        const {token} = useSelector( (state) => state.auth);
        console.log("TOKEN ",token);
         const {user} =  useSelector( (state) => state.profile);
        const {totalItems} = useSelector((state) => state.cart);
        
        const [subLinks, setSubLinks] = useState([]);
        const [loading, setLoading] = useState(false);
//         // return meh console nai krneka, sab  udhar ui par render hotta hai
// console.log("TOKEN:", token);
// console.log("USER:", user);
         const fetchSubLinks = async () => {
                setLoading(true);
                 try {

                    const result = await apiConnector("GET",categories.CATEGORIES_API);
                    // console.log("printing subLinks result, ",result);
                    // const data = await result.json();   // ✅ await here
                    setSubLinks(result.data?.data);
                  } catch (error) {
                    console.log("ERROR IS = ",error);
                }
                setLoading(false);
        }



                    useEffect(()=>{
                            fetchSubLinks();
                    },[])

 
    return(

        <div className="flex justify-between max-w-[1160px] w-11/12 mx-auto border-b-richblack-700  border-[1px] items-center py-2">
            <Link to = "/">
                <img src = {Logo} width={160} height={32} loading="lazy"></img>
            </Link>

            <nav className="text-white">
                      <ul className="flex gap-x-6">
                        {
                            NavbarLinks.map((element,index)=>{
                                return  (
                                    <div key={index}>
                                        {element.title !== "Catalog"? (<Link to={element.path}>
                                            <p className={`${ matchRouutee(element.path)? "text-yellow-25" : "text-richblack-25"}`}>{element.title}</p>
                                        </Link>)
                                         :
                                        (
                                            <div className=" flex gap-1 relative items-center group cursor-pointer">
                                                <p>{element.title}</p>
                                                <IoIosArrowDropdownCircle></IoIosArrowDropdownCircle>

                                                    {/* white wala part */}
                                                    <div className=" invisible absolute left-[50%] top-[50%] bg-richblack-5 p-3 opacity-0
                                                    flex flex-col text-richblue-900 transition-all duration-200 rounded-md
                                                    group-hover:visible group-hover:opacity-100 w-[150px] 
                                                        translate-x-[-45%] translate-y-[20px] group-hover:z-50
                                                    ">

                                                                {/* arrow wala */}
                                                                <div className=" absolute -top-1 left-[20%] w-4 h-3 invisible
                                                                    group-hover:visible bg-richblack-5  rotate-45
                                                                    translate-y-[-10%] pointer-events-none
                                                                "> 
                                                                    </div>


                                                        {/* white part meh title daalna */}

                                                                                                {
                                                                subLinks?.length > 0 ? (
                                                                    subLinks.map((ele) => (
                                                                    <Link to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`} key={ele._id}>
                                                                        <p className="opacity-100 hover:bg-richblack-100 group-hover:z-50 p-4 rounded-md">
                                                                        {ele.name}
                                                                        </p>
                                                                    </Link>
                                                                    ))
                                                                ) : null
                                                                }
                                                    </div>
                                            </div>) 
                                             }
                                         
                                    </div>
                                )
                            })
                        }
                     </ul>
            </nav>
       

            <div className="hidden items-center gap-x-6 md:flex">
                            {
                                user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                    <Link to={"/dashboard/cart"} className="relative">
                                            <CiShoppingCart className="text-[30px] text-richblack-100"></CiShoppingCart>
                                            {
                                                totalItems > 0 && (
                                                    <span 
                                        className="absolute  -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100"             
                                                    >{totalItems}</span>
                                                )
                                            }
                                    </Link> 
                                )
                            }


                            {
                                token === null && (
                                    <Link to="/login">
                                        <button className="border-richblack-700 border-2 bg-richblack-800 px-[12px]  py-[8px] text-richblack-25 rounded-md">
                                            Log in
                                        </button>
                                    </Link>
                                )
                            }

                            {
                                token === null && (
                                    <Link to="/signup">
                                        <button className="border-richblack-700 border-2 bg-richblack-800 px-[12px]  py-[8px] text-richblack-25 rounded-md">
                                            Sign Up
                                        </button>
                                    </Link>
                                )
                            }
 

                            {
                                // react component should be in Capital Always
                                token !==null && <ProfileDropDown></ProfileDropDown>
                            }
            </div>
            
        </div>
    )
}

export default Navbar;