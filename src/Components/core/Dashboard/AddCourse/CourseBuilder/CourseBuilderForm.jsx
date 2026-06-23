import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconBtn } from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { MdNavigateNext } from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'

export const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [editSectionName, setEditSectionName] = useState(null)
  const [loading, setLoading] = useState(false)

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  // 🔙 Go back
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  // ➡️ Next step
  const gotoNext = () => {

    if (!course) {
      toast.error("Course not loaded")
      return
    }

    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    if (
      course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add atleast one subSection")
      return
    }

    dispatch(setStep(3))
  }

  // ✏️ Edit section name
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // ❌ Cancel edit
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  // 🚀 Submit
  const onSubmit = async (data) => {

    console.log("Form data = ", data)

    // ✅ SAFETY CHECK
    if (!course?._id) {
      toast.error("Course not found")
      return
    }

    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,   // ✅ FIXED
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    console.log("API result =", result)

    // ✅ UPDATE REDUX
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] w-[500px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      {/* FORM */}
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor='sectionName' className="text-sm text-richblack-5">
            Section name <sup className="text-pink-200">*</sup>
          </label>

          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", { required: true })}
            className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          />

          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        <div className=' flex items-end gap-x-4'>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section" : "Create Section"}
            outline={true}
            disabled={loading}
          >
            <IoAddCircleOutline className='text-yellow-50' />
          </IconBtn>

          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* SECTION LIST */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}

      {/* NAVIGATION */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>

        <IconBtn text="Next" onclickkkk={gotoNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}