import Wordbreak from "../common/Wordbreak";
import CreateUser from "./CreateUser";
import HeroImage from "../../assets/images/heroImage.svg";

const HeroSection = () => {
  // Landing Screen Container
  return (
    <div className="text-center space-y-6 transition-all ease-in-out">
      <h2 className="text-primary text-3xl font-bold">Create a New Project</h2>
      <div className="flex items-center justify-center">
        <img src={HeroImage} alt="hero image" />
      </div>
      <p className="text-[#838383]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore <Wordbreak /> magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea <Wordbreak />
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
      {/* Create Account */}
      <CreateUser />
    </div>
  );
};

export default HeroSection;
