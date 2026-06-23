import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

import { Player, BigPlayButton } from "video-react";
import { IconBtn } from "../../common/IconBtn";

import "video-react/dist/video-react.css";

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  console.log("course id  = ",courseId);
  console.log("section id = ",sectionId);
  console.log("subsec id = ",subSectionId)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const playerRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData,courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
    
  );

 
console.log("Redux State =", {
  courseSectionData,
  courseEntireData,
  completedLectures,
});
     
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= SET VIDEO DATA =================
  useEffect(() => {
    const setVideoSpecificDetails = () => {
      console.log("coursection data = ", courseSectionData);
      if (!courseSectionData?.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const section = courseSectionData.find(
        (sec) => sec._id === sectionId
      );

      const subSection = section?.subSection?.find(
        (sub) => sub._id === subSectionId
      );

      
      setVideoData(subSection || null);
      setVideoEnded(false);
      console.log("vedio data = ",videoData);
    };

    setVideoSpecificDetails();
  }, [courseSectionData, location.pathname]);

  // ================= NEXT VIDEO =================
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSection = courseSectionData[currentSectionIndex];
    const currentSubIndex = currentSection?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    // next subsection in same section
    if (currentSubIndex < currentSection.subSection.length - 1) {
      const nextSubSectionId =
        currentSection.subSection[currentSubIndex + 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // next section
      if (currentSectionIndex + 1 < courseSectionData.length) {
        const nextSection = courseSectionData[currentSectionIndex + 1];

        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
        );
      }
    }
  };

  // ================= PREVIOUS VIDEO =================
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSection = courseSectionData[currentSectionIndex];
    const currentSubIndex = currentSection.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    // previous subsection
    if (currentSubIndex > 0) {
      const prevSubSectionId =
        currentSection.subSection[currentSubIndex - 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // previous section
      if (currentSectionIndex > 0) {
        const prevSection = courseSectionData[currentSectionIndex - 1];
        const lastSub =
          prevSection.subSection[prevSection.subSection.length - 1];

        navigate(
          `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSub._id}`
        );
      }
    }
  };

  // ================= HELPERS =================
  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const currentSection = courseSectionData[sectionIndex];

    const subIndex = currentSection?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    return (
      sectionIndex === courseSectionData.length - 1 &&
      subIndex === currentSection.subSection.length - 1
    );
  };

  // ================= MARK COMPLETE =================
  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  // ================= UI =================
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          src={videoData?.VideoUrl}
          onEnded={() => setVideoEnded(true)}
        >
          <BigPlayButton position="center" />

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, black, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
              }}
              className="absolute inset-0 z-[100] grid place-content-center"
            >
              {/* Mark Complete */}
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclickkkk={handleLectureCompletion}
                  text={loading ? "Loading..." : "Mark As Completed"}
                  customClasses="text-xl px-4 mx-auto"
                />
              )}

              {/* Rewatch */}
              <IconBtn
                onclickkkk={() => {
                  playerRef.current?.seek(0);
                  setVideoEnded(false);
                }}
                text="Rewatch"
                customClasses="text-xl px-4 mx-auto mt-2"
              />

              {/* Navigation */}
              <div className="flex gap-4 mt-4 justify-center">
                {!isFirstVideo() && (
                  <button
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">
        {videoData?.title}
      </h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;