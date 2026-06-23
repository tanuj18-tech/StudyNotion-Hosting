import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

// ✅ Get all courses
export const getAllCourses = async () => {
  const toastId = toast.loading("dfdfds")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses")
    }

    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API ERROR", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// ✅ Fetch course details
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("rsppsn s= ", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR", error)
    result = error?.response?.data
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Fetch categories
export const fetchCourseCategories = async () => {
    const toastId = toast.loading("Loading...")

  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Categories")
    }

    result = response?.data?.data
  } catch (error) {
    console.log("CATEGORY ERROR", error)
    toast.error(error.message)
  }
  console.log("result = ",result);
  toast.dismiss(toastId)
  return result
}

// ✅ Create course
export const addCourseDetails = async (data, token) => {
  let result = null
  console.log("dataaaa idhar dekhe toh ",data);
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    console.log("response dekhen = ",response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course")
    }

    toast.success("Course Created")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE ERROR", error)
    toast.error(error.message);
    toast.error("File size must not exceed 10,000 KB.")
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Edit course
// export const editCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")

//   try {
//     const response = await apiConnector("POST", EDIT_COURSE_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     })

//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Course")
//     }
//     console.log("RESPONSE = == ",response);
//     toast.success("Course Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("EDIT COURSE ERROR", error)
//     toast.error(error.message)
//   }

//   toast.dismiss(toastId)
//   return result
// }

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Updating...");
    console.log("idharr kya dadat edit meh ",data);
  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("FULL RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Update Course");
    }

    toast.success("Course Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// ✅ Create section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  console.log("data = ",data);
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("response = ",response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }

    toast.success("Section Created")
    
    result = response?.data?.data
    //  console.log("response = ",result);
  } catch (error) {
    console.log("CREATE SECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Update section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  console.log("dataaaaaaaaaa idharr = ",data);
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }

    toast.success("Section Updated")
    result = response?.data?.data
    console.log("ab dekh tu ",response.data);
    console.log("resullllttt = ",result)
  } catch (error) {
    console.log("UPDATE SECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Delete section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }

    toast.success("Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Create subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  // console.log("dtaa = ",data);
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Create Subsection")
    }
    // console.log("response n=== ",response);
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUBSECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Update subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Update Subsection")
    }

    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUBSECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Delete subsection
export const deleteSubSection = async (data, token) => {
  // console.log("dta = ",data);
  // console.log("token = ",token);
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("resposne = ",response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Subsection")
    }

    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUBSECTION ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Fetch instructor courses
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }

    result = response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// ✅ Delete course
export const deleteCourse = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

    toast.success("Course Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE COURSE ERROR", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}


// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  console.log("coursid = ana token",courseId);
  console.log("toeken ",token);
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("HELLOW BOYS")
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    console.log("dta a= ", data);
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
     console.log("CREATE RATING API RESPONSE............", response)

    if (!response?.data?.success) {
       toast.error(response?.data?.message);
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error.message)

    // yeh aese response ko handle kiya toh , toast meh error dikhta haiii
    toast.error(error.response.data.message)
   
  }
  toast.dismiss(toastId)
  return success
}