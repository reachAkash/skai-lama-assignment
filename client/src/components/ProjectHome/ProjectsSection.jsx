import { useEffect, useState } from "react";
import CreateProject from "../Landing/CreateProject";
import { Project } from "../Project";
import axiosInstance from "../../api/axiosInstance";
import { apiRoutes } from "../../api/apiRoutes";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetails, userProjects } from "../../recoil/atoms";
import { v4 as uuid } from "uuid";

export const ProjectsSection = () => {
  const [projects, setProjects] = useRecoilState(userProjects);
  const user = useRecoilValue(userDetails);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleGetProjects = async () => {
    try {
      const response = await axiosInstance.post(apiRoutes.getProjectApi, {
        userId: user._id,
      });
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-6 md:px-24">
        <div className="text-primary text-2xl font-bold">Projects</div>
        <CreateProject />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-start flex-wrap gap-8 px-0 md:px-20">
        {loading ? ( // Show loader while fetching
          <div className="w-full text-center text-2xl text-black/80 font-semibold pt-10">
            Loading projects...
          </div>
        ) : projects.length > 0 ? (
          projects?.map((item) => {
            return <Project key={uuid()} item={item} />;
          })
        ) : (
          <div className="w-full text-center text-2xl text-black/80 font-semibold pt-10">
            No Projects Yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
