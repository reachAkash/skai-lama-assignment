import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "./common/Button";
import { apiRoutes } from "../api/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentFile, currentProject, userDetails } from "../recoil/atoms";
import axiosInstance from "../api/axiosInstance";

const ViewFile = () => {
  const navigate = useNavigate();
  const [currFile, setCurrFile] = useRecoilState(currentFile);
  const user = useRecoilValue(userDetails);
  const project = useRecoilValue(currentProject);

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState(currFile?.transcript || "");
  const [tempTranscript, setTempTranscript] = useState(transcript);

  // reset current file when component unmounts
  useEffect(() => {
    return () => {
      setCurrFile({});
    };
  }, []);

  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setTempTranscript(transcript);
  };

  // Discard edits
  const handleDiscard = () => {
    setIsEditing(false);
    setTempTranscript(transcript);
  };

  // Update transcript API call
  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.patch(
        `${apiRoutes.getFiles}/${currFile?._id}`,
        {
          userId: user._id,
          projectId: project,
          transcript: tempTranscript,
        }
      );
      if (response.data.success) {
        setTranscript(tempTranscript);
        setCurrFile({ ...currFile, transcript: tempTranscript });
        setIsEditing(false);
      } else {
        console.error("Failed to update transcript");
      }
    } catch (error) {
      console.error("Error updating transcript: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start text-2xl font-semibold gap-4">
          <IoArrowBackOutline
            className="cursor-pointer"
            onClick={() => {
              setCurrFile({});
            }}
          />
          {isEditing ? "Edit Transcript" : "View Transcript"}
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className={`px-8 py-2`}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleDiscard}
              className={`px-4 py-2 text-red-500 border border-red-500 rounded`}
            >
              Discard
            </button>
            <Button
              onClick={handleUpdate}
              className={`px-4 py-2 bg-primary text-white`}
            >
              Update
            </Button>
          </div>
        )}
      </div>
      <div className="bg-white space-y-5 px-8 py-8">
        <div className="text-primary text-lg font-semibold">Speaker</div>
        {!isEditing ? (
          <p className="text-[#63635E]">{transcript}</p>
        ) : (
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            value={tempTranscript}
            onChange={(e) => setTempTranscript(e.target.value)}
            rows={10}
          />
        )}
      </div>
    </div>
  );
};

export default ViewFile;