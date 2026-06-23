import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "../../../common/ConfirmationModal";

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

import { formatDate } from "../../../../services/formatDate";

const CoursesTable = ({ courses, setCourses }) => {
  console.log("courses = ",courses)
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const [confirmationModalState, setConfirmationModalState] =
    useState(null);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const navigate = useNavigate();

  // single delete
  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId }, token);

    const result = await fetchInstructorCourses(token);

    setCourses(result);

    setConfirmationModalState(null);

    setLoading(false);
  };

  // checkbox select
  const handleCheckboxChange = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // select all
  const handleSelectAll = () => {
    if (selectedCourses.length === courses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(courses.map((course) => course._id));
    }
  };

  // bulk delete
  const handleDeleteSelected = async () => {
    setLoading(true);

    for (const courseId of selectedCourses) {
      await deleteCourse({ courseId }, token);
    }

    const result = await fetchInstructorCourses(token);

    setCourses(result);

    setSelectedCourses([]);

    setConfirmationModalState(null);

    setLoading(false);
  };

  return (
    <div>
      {/* delete selected button */}
      <div className="mb-4 flex items-center gap-4">
        <button
          disabled={loading || selectedCourses.length === 0}
          onClick={() => {
            setConfirmationModalState({
              text1: "Delete selected courses?",
              text2:
                "All selected courses will be permanently deleted.",
              btn1Text: !loading ? "Delete" : "Loading...",
              btn2Text: "Cancel",
              btn1Handler: handleDeleteSelected,
              btn2Handler: () =>
                setConfirmationModalState(null),
            });
          }}
          className="rounded-md bg-yellow-50 px-4 py-2 text-black disabled:opacity-50"
        >
          Delete Selected ({selectedCourses.length})
        </button>
      </div>

      <Table className="rounded-xl border border-richblack-800 text-white">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            {/* select all checkbox */}
            <Th className="flex items-center">
              <input
                type="checkbox"
                checked={
                  courses.length > 0 &&
                  selectedCourses.length === courses.length
                }
                onChange={handleSelectAll}
              />
            </Th>

            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>

            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
               
            </Th>

            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>

            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => {
              return (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                >
                  {/* row checkbox */}
                  <Td className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(
                        course._id
                      )}
                      onChange={() =>
                        handleCheckboxChange(course._id)
                      }
                    />
                  </Td>

                  {/* course data */}
                  <Td className="flex flex-1 gap-x-4">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />

                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>

                      <p className="text-xs text-richblack-300">
                        {course.courseDescription}
                      </p>

                      <p className="text-[12px] text-white">
                        Created: {formatDate(course.createdAt)}
                      </p>

                      {course.status ===
                      COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          DRAFTED
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-200">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-200 text-richblue-700">
                            <FaCheck size={8} />
                          </div>

                          Published
                        </p>
                      )}
                    </div>
                  </Td>

                  {/* duration */}
                  <Td className="text-sm font-medium text-richblack-100">
                   
                  </Td>

                  {/* price */}
                  <Td className="text-sm font-medium text-richblack-100">
                    ${course.price}
                  </Td>

                  {/* actions */}
                  <Td className="text-sm font-medium text-richblack-100">
                    {/* edit */}
                    <button
                      disabled={loading}
                      onClick={() =>
                        navigate(
                          `/dashboard/edit-course/${course._id}`
                        )
                      }
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    {/* delete */}
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModalState({
                          text1:
                            "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading
                            ? "Delete"
                            : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () =>
                                handleCourseDelete(
                                  course._id
                                )
                            : () => {},
                          btn2Handler: !loading
                            ? () =>
                                setConfirmationModalState(
                                  null
                                )
                            : () => {},
                        });
                      }}
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>

      {/* modal */}
      {confirmationModalState && (
        <ConfirmationModal
          modalData={confirmationModalState}
        />
      )}
    </div>
  );
};

export default CoursesTable;