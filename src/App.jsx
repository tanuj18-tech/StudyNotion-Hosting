import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import {Home} from "./pages/Home"
import {Navbar} from "../src/Components/common/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import {MyProfile} from "./Components/core/Dashboard/MyProfile"
import Contact from "./pages/Contact";
import { Dashboard } from "./pages/Dashboard";
import OpenRoute from "../src/Components/core/Auth/OpenRoute"
import { PrivateRoute } from "./Components/core/Auth/PrivateRoute";
import Error from "../src/pages/Error"
import { Settings } from  "../src/Components/core/Dashboard/Settings/Settings"
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import { Cart } from "./Components/core/Dashboard/Cart";
import {ACCOUNT_TYPE, utils} from "../src/utils/constants"
import { useSelector } from "react-redux";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import { AddCourse } from "./Components/core/Dashboard/AddCourse";
import {Editcourse} from "./Components/core/Dashboard/EditCourse/Editcourse"
import Catalog from "../src/pages/Catalog"
import {CourseDetails} from "../src/pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse";
import { VideoDetailsSidebar } from "./Components/core/ViewCourse/VideoDetailsSidebar";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails"
import Instructor from "../src/Components/core/Dashboard/InstructorDashboard/Instructor"
 function App() {

  // auth slice meh tumhe sirf token milega use nahi
  const {token} = useSelector((state)=>state.auth);
  console.log("TOKEN = ",token);
  //   const {use} = useSelector((state)=> state.auth)

  const {user} = useSelector((state)=> state.profile)
  return (
                                    // MIN-H-SCREEN                                    This ensures:

                                    // Minimum height = screen
                                    // Expands if content grows
        <div className="w-screen bg-richblack-900 h-full flex flex-col font-inter">
          
          <Navbar></Navbar>
            <Routes>

              {/* common routes */}
              <Route path="/" element= {<Home></Home>}></Route>
              <Route path="catalog/:catalogName" element = {<Catalog/>}></Route>
              <Route path="courses/:courseId" element = {<CourseDetails/>}></Route>
                            {/* ":" It allows your route to match URLs like:

              /catalog/react
              /catalog/javascript
              /catalog/web-dev

              Instead of hardcoding every path, you use a placeholder (catalogName) in catalog page */}
              <Route path="signup" element={
                      <OpenRoute>
                            <Signup />
                      </OpenRoute>
                      
           }  />



            <Route path="login" element = {<OpenRoute>

                      <Login></Login>
            </OpenRoute> }></Route>


           <Route path="about" element={<About></About>}></Route>

           <Route path="forgot-password" element = {<ForgotPassword></ForgotPassword>}>  </Route>
            <Route path="update-password/:id" element = {<UpdatePassword></UpdatePassword>}>  </Route>

           <Route path="verify-email" element = {<VerifyEmail></VerifyEmail>}></Route>







                  {/* see this routing in chatgpt */}
              <Route element = {
                <PrivateRoute>
                    <Dashboard></Dashboard>
                </PrivateRoute>
               }>



                  <Route path="dashboard/my-profile" element = {<MyProfile></MyProfile>}></Route>
                  {/* side bar stayed , even after clicking it */}
                  <Route path="dashboard/settings" element = {<Settings></Settings>}></Route>

                  {/* student hi access kar payega courses ko , instructor nahi toh ek check lagado */}
                  {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
                      <>
                        <Route path="dashboard/enrolled-courses" element = {<EnrolledCourses></EnrolledCourses>}></Route>
                        <Route path="dashboard/cart" element = {<Cart></Cart>}></Route> 
                      </>
                    )
                  }
                  {/* Instructor ka myCourses banana hai HW */}
                  {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                        <Route path="dashboard/instructor"  element = {<Instructor/>}></Route>
                        <Route path="dashboard/my-courses" element =  {<MyCourses/>}></Route>
                        <Route path="dashboard/add-course" element = {<AddCourse/>}></Route>
                          // useParams idhar : iss se aage wala value lega
                        <Route path="dashboard/edit-course/:courseId" element = {<Editcourse/>}></Route>
                      </>
                    )
                  }
              </Route>
         


              <Route element = {
                <PrivateRoute>
                  <ViewCourse/>
                </PrivateRoute>
              }>

                {
                  user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                      <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element = {<VideoDetails/>}
                      ></Route>
                    </>
                  )
                }
              </Route>


           <Route path="/about" element = {<About></About>}></Route>
           <Route path="/contact" element = {<Contact></Contact>}></Route>
          

           {/* iske alawa kuch hit mara toh error page */}
           <Route path="*" element = {<Error></Error>}></Route>
            </Routes>

             
        </div>
  );
}

export default App;
