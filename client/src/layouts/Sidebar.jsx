import React from "react";
import Logo from "../assets/images/logo.svg";
import { sidebarData } from "../utils/constants";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDetails } from "../recoil/atoms";
import { ComingSoonSidebar } from "../components/ModalCards";

const Sidebar = () => {
  const { username } = useRecoilValue(userDetails);

  return (
    <div className="bg-white px-6 py-10 flex flex-col items-center justify-between h-screen">
      <div className="space-y-6">
        <div>
          <Link to="/">
            <img className="w-2/3" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="pb-6 border-b-2 border-gray-200 space-y-1">
          {sidebarData?.map((item, index) => (
            <div key={index}>
              {/* show coming soon modal */}
              {item.comingSoon ? (
                <ComingSoonSidebar>
                  <div className="flex items-center justify-start gap-2 px-4 py-3 rounded-md hover:bg-[#F3E8FF88] text-gray-500 hover:text-primary font-semibold cursor-pointer">
                    <item.icon />
                    {item.text}
                  </div>
                </ComingSoonSidebar>
              ) : (
                <div className="flex items-center justify-start gap-2 px-4 py-3 rounded-md bg-[#F3E8FF88] text-primary font-bold cursor-pointer">
                  <item.icon />
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-2">
        <img
          className="w-10 flex-shrink-0"
          src="https://imgs.search.brave.com/LxJ4LavUfTCR4kayeoHI7JgEdkzbU0klZ32Y-H7OuCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yb3Vu/ZGVyLnBpY3MvYXNz/ZXRzL2ltZy91aS9o/ZWFydC53ZWJw"
          alt="user icon"
        />
        <div>{username}</div>
      </div>
    </div>
  );
};

export default Sidebar;
