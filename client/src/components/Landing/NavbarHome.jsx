import { IoMdSettings } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { useRecoilValue } from "recoil";
import { userDetails } from "../../recoil/atoms";

const NavbarHome = () => {
  const user = useRecoilValue(userDetails);
  // For outer screens
  return (
    <div className="flex items-center justify-between px-24">
      <div className="">
        <Link to="/">
          <img className="w-2/3" src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <IoMdSettings className="text-3xl text-black cursor-pointer" />
        <IoNotifications className="text-3xl text-black cursor-pointer" />
        {user?._id && (
          <img
            className="w-10 flex-shrink-0"
            src="https://imgs.search.brave.com/LxJ4LavUfTCR4kayeoHI7JgEdkzbU0klZ32Y-H7OuCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yb3Vu/ZGVyLnBpY3MvYXNz/ZXRzL2ltZy91aS9o/ZWFydC53ZWJw"
            alt="user icon"
          />
        )}
      </div>
    </div>
  );
};

export default NavbarHome;
