import NavbarHome from "../components/Landing/NavbarHome";
import ProjectsSection from "../components/ProjectHome/ProjectsSection";

const ProjectsHome = () => {
  return (
    // Project Listing Screen
    <div className="space-y-10 py-6">
      <NavbarHome />
      <ProjectsSection />
    </div>
  );
};

export default ProjectsHome;
