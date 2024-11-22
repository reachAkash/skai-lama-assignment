import { useEffect } from "react";
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
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-24">
        <div className="text-primary text-2xl font-bold">Projects</div>
        <CreateProject />
      </div>
      <div className="flex items-center justify-start flex-wrap gap-8 px-20">
        {projects.length > 0 ? (
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
