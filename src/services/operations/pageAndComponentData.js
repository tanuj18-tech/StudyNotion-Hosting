import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";
import { jsx } from "react/jsx-runtime";

const getCatalogPageData = async (categoryId) => {
  let result = [];
//   console.log("c id ",categoryId);
  const toastId = toast.loading("Loading...");
  try {
    // console.log("hi");
    console.log("Before API");
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});
    console.log("responseee = ",response);
    if(!response?.data?.success){
        throw new Error("Could not fetch category page data");
    }
console.log("After API");
        //idhar const krdia toh naya variable bn gaya tha
    result = response?.data;
  } catch (error) {
      console.log("CATEGORY PAGE DATA API ERROR.... ",error.message);
       toast.error(error.message);
      result = error.response?.data
  }


    finally{
      console.log("hiiii")
       toast.remove(toastId);
    }
      
      return result;
}

export default getCatalogPageData;
// import React from 'react'
// import {toast} from "react-hot-toast"
// import { apiConnector } from '../apiconnector';
// import { catalogData } from '../apis';

// export const getCatalogaPageData = async(categoryId) => {
//   const toastId = toast.loading("Loading...");
//   let result = [];
//   try{
//         const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
//         {categoryId: categoryId,});

//         if(!response?.data?.success)
//             throw new Error("Could not Fetch Category page data");

//          result = response?.data;

//   }
//   catch(error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);
//     toast.error(error.message);
//     result = error.response?.data;
//   }
//   toast.dismiss(toastId);
//   return result;
// }

