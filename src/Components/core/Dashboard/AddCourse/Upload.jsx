import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"
import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  // console.log("view data null???", viewData);
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  //  console.log("preview == ",previewSource)
  const inputRef = useRef(null)
 
 
  const onDrop = (acceptedFiles) => {
    // console.log("onDrop called", acceptedFiles)

    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true, // disable default click,
     disabled: viewData ? true : false   // ✅ ADD THIS
  })

  const previewFile = (file) => {
    // console.log("previewFile called")

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      // console.log("File loaded")
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    // console.log("Registering field:", name)
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    // console.log("Setting value:", selectedFile)
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* Dropzone Container */}
<div
  {...getRootProps()}
  onClick={() => {
    if (viewData) return;
    inputRef.current?.click()
  }}
  className={`${
    isDragActive ? "bg-richblack-600" : "bg-richblack-700"
  } flex min-h-[250px] items-center justify-center rounded-md border-2 border-dotted border-richblack-500 
  ${viewData ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
>
        {/* Input */}
        <input
          {...getInputProps()}
          ref={inputRef}
          // onClick={() => console.log("INPUT CLICKED")}
        />

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {/* Preview */}
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (

              // <Player aspectRatio="16:9" playsInline src={previewSource} />
                              <div
                  onClick={(e) => e.stopPropagation()}
                >
                  <Player aspectRatio="16:9" playsInline src={previewSource} />
                </div>
            )}

            {/* Cancel Button */}
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  // console.log("BUTTON CLICKED")

                  e.stopPropagation()

                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {/* Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}