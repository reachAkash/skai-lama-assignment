import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import {
  currentFile,
  currentProject,
  files,
  userDetails,
} from "../recoil/atoms";
import { apiRoutes } from "../api/apiRoutes";
import axiosInstance from "../api/axiosInstance";
import { useToast } from "../context/ToastContext";

export const FilesList = ({ filesData }) => {
  const setCurrentFile = useSetRecoilState(currentFile);
  const user = useRecoilValue(userDetails);
  const project = useRecoilValue(currentProject);
  const currProject = useRecoilValue(currentProject);
  const setFiles = useSetRecoilState(files);

  // format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  };

  const { showToast } = useToast();

  const handleSuccess = (message) => {
    showToast(message, true);
  };

  const handleFailure = (message) => {
    showToast(message, false);
  };

  // set viewing file
  const handleViewFile = (item) => {
    setCurrentFile(item);
  };

  // retrieving updated files
  const handleGetFiles = async () => {
    try {
      const response = await axiosInstance.post(apiRoutes.getFiles, {
        projectId: currProject,
      });
      setFiles(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // deleting file
  const handleDeleteFile = async (id) => {
    try {
      const response = await axiosInstance.post(
        `${apiRoutes.deleteFile}/${id}`,
        {
          userId: user._id,
          projectId: project,
        }
      );
      console.log(response);
      if (response.data.success) {
        handleSuccess(response.data.message);
        handleGetFiles();
      } else {
        handleSuccess("Failed to update transcript");
        console.error("Failed to update transcript");
      }
    } catch (error) {
      handleSuccess(error.message);
      console.error("Error updating transcript: ", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md text-center space-y-4 px-8 xl:px-20 py-8 transition-all ease-in-out h-[22rem] group">
      <div className="text-[#1D1929] text-lg text-start font-semibold">
        Your Files
      </div>

      {/* Wrapping the table in a div with horizontal scrolling */}
      <div className="overflow-scroll group-hover:scrollbar w-1 min-w-full h-[15rem]">
        <table className="w-full border-collapse border-spacing-0 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-2">No.</th>
              <th className="px-6 py-2">Name</th>
              <th className="px-6 py-2">Upload Date & Time</th>
              <th className="px-6 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filesData?.map((item, idx) => (
              <tr key={uuid()} className="border-b border-[#EDEDED]">
                <td className="px-2 py-2">{idx + 1}.</td>
                <td className="px-2 py-2 truncate max-w-[180px]">
                  {item?.name}
                </td>
                <td className="px-2 py-2">{formatDate(item?.createdAt)}</td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => handleViewFile(item)}
                    className="border-2 border-[#C7C7C7] text-[#646464] px-3 py-2 md:rounded-r-none rounded-lg"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteFile(item._id)}
                    className="border-2 border-[#C7C7C7] text-[#FF274C] px-3 py-2 md:rounded-l-none rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilesList;
