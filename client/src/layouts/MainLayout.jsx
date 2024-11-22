import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProjectPage from "../pages/ProjectPage";
import ViewFile from "../components/ViewFile";
import { useRecoilValue } from "recoil";
import { currentFile } from "../recoil/atoms";

const MainLayout = () => {
  const currFile = useRecoilValue(currentFile);

  return (
    // inner screen layout
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#f9f9f9] py-10 px-10 xl:px-16 space-y-6 min-h-fit max-h-screen">
        <Navbar />
        {currFile._id ? <ViewFile /> : <ProjectPage />}
      </div>
    </div>
  );
};

export default MainLayout;
