import NavbarHome from "../components/Landing/NavbarHome";
import HeroSection from "../components/Landing/HeroSection";

const Home = () => {
  return (
    // Landing Screen
    <div className="h-screen space-y-10 py-6">
      <NavbarHome />
      <HeroSection />
    </div>
  );
};

export default Home;