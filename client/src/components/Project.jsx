import React from "react";
import axiosInstance from "../api/axiosInstance";
import { apiRoutes } from "../api/apiRoutes";
import { useSetRecoilState } from "recoil";
import { currentProject, files } from "../recoil/atoms";
import { useNavigate } from "react-router-dom";

export const Project = ({ item }) => {
  const setFiles = useSetRecoilState(files);
  const setProject = useSetRecoilState(currentProject);
  const navigate = useNavigate();

  const handleGetFiles = async (item) => {
    try {
      const response = await axiosInstance.post(apiRoutes.getFiles, {
        projectId: item._id,
      });
      setFiles(response.data.data);
      navigate(`${item?.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => {
        handleGetFiles(item);
        setProject(item._id);
      }}
      className="min-w-[280px] xl:min-w-[300px] flex items-center justify-start border-2 pl-2 pr-6 py-3 gap-4 border-gray-200 rounded-xl cursor-pointer group hover:bg-gray-50 transition-all duration-500 ease-in-out"
    >
      <div className="text-white">
        <div className="bg-yellow-300 w-fit text-3xl py-5 px-6 rounded-xl">
          AK
        </div>
      </div>
      <div className="group-hover:scale-105 duration-500">
        <div className="text-primary font-bold truncate w-full max-w-[150px]">
          {item?.name}
        </div>
        <div className="text-xs">{item.files.length} files</div>
      </div>
    </div>
  );
};

export default Project;
