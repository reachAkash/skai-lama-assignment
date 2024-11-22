import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { MdExitToApp } from "react-icons/md";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { ComingSoonModal } from "../components/ModalCards";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <Breadcrumbs />
      <div className="flex items-center gap-4">
        <ComingSoonModal>
          <div className="">
            <img className="w-[20%]" src={Logo} alt="logo" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Feature Coming Soon...</h2>
        </ComingSoonModal>
        <div
          onClick={() => navigate(-1)}
          className="border border-[#999999]/30 text-red-500 rounded-full p-2 cursor-pointer"
        >
          <MdExitToApp className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
