import { useParams } from "react-router-dom";
import Footer from "../Components/common/Footer";
import { useDebugValue, useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import getCatalogPageData from "../../src/services/operations/pageAndComponentData"
import Course_Card from "../Components/core/Catalog/Course_Card"
import CourseSlider from "../Components/core/Catalog/CourseSlider"
import toast from "react-hot-toast";
const Catalog = () => {
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState();
  const [categoryId, setCategoryId] = useState();
  const [active, setActive] = useState(1);

  // jab bhhi upar catalogname change hoga tab yeh run  hoga
  useEffect(()=>{ 
      const getCategoryDetails = async () => {
        //sab categories le aao
        const response = await apiConnector("GET", categories.CATEGORIES_API);

        const category_id = response?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        // console.log("this one ",category_id);
        setCategoryId(category_id)
      }

      getCategoryDetails();
  }, [catalogName]);


    // usss id ka sab data la
    useEffect(() => {
      // console.log("iddharr ",categoryId);
 if (!categoryId) return;

        const getCategoryDetails = async () => {
          let res ;
            try {
              // console.log("idhar ararha");
                     res = await getCatalogPageData(categoryId);
                   console.log("printing res = ",res);
                   if(!res.success) toast.error(res.message)
                   setCatalogPageData(res);
            } catch (error) {
               
                  console.log(error);
            }
        }

        getCategoryDetails();
    }, [categoryId])
 
 
 return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-white text-3xl font-bold">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}


          {/* <div> */}
            {/* <div className="section_heading text-white  text-3xl font-bold">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div> */}
            {/* <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div> */}
          {/* </div> */}
    
          {/* Section 3 */}
          <div className=" mx-auto text-white box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading  text-white text-3xl font-bold">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )

      
 
  
}

// my code 
    // <div className=" box-content bg-richblack-800 px-4">

    //         <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
    //           <p className="text-sm text-richblack-300">{`Home/ Catalog/ `}
    //             <span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span>
    //           </p>
    //            <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
    //           <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
              
    //         </div>





    //             {/* section 1 */}
    //           <div>
    
                   
    //                 <div>

    //                   </div>
    //                   <div className="my-4 flex border-b border-b-richblack-600 text-sm">
    //                   <p className= {`px-2 py-4 ${active=== 1? " border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
    //                   // agar ismeh arrow function use nahi karoge toh tooo many renders ka dega error
    //                     onClick={()=>setActive(1)}
    //                   >Most Popular</p>
    //                   <p 
    //                   className= {`px-4 py-2 ${active=== 2? " border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
    //                     onClick={()=>setActive(2)}
    //                   >New</p>

                      
    //                   <div>
    //                      <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.courses}/>
    //                     </div>
                      
    //                   </div>

    //                   {/* section 2 */}
    //                     <div>
    //                     <p>Top Courses in ${catalogPageData?.data?.differentCategory?.name}</p>
    //                     {/* <CourseSlider/> */}
    //                     </div>

    //                   {/* section 3 */}
    //                   <div>
    //                     <p>Frequently Bought Together</p>
    //                       <div className=" py-8">
    //                             <div className=" grid grid-cols-1 lg:grid-cols-2">
    //                                   {
    //                                     // Means first 4
    //                                     catalogPageData?.data?.mostSellingCourse?.slice(0, 4)
    //                                     .map((course, index) => {
    //                                       return (
    //                                         <Course_Card course = {course} key = {index} Height = {"h-[400px]"}/>
    //                                       )
    //                                     })
    //                                   }
    //                               </div>
    //                         </div>
    //                     </div>
    //           </div>

    //           <Footer/>
    //    </div>
    

export default Catalog;
 