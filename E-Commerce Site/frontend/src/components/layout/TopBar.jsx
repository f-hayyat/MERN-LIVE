import React from "react";
import { RiMetaLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
const TopBar = () => {
  return (
    <>
      <div className="bg-[#bf6e35] text-white py-1">
        <div className="container mx-auto flex justify-between items-center">
          <div className=" hidden md:flex items-center space-x-3 ml-4">
            <a href="#" className="hover:text-gray-300">
              <RiMetaLine />
            </a>
            <a href="#" className="hover:text-gray-300 ">
              <IoLogoInstagram />
            </a>
            <a href="#" className="hover:text-gray-300 ">
              <FaXTwitter />
            </a>
          </div>
          <div className="text-sm text-center flex-grow">
            <span>We ship worldwide - Fast and reliable shipping</span>
          </div>
          <div className="hidden text-sm md:block items-center space-x-3">
            <a href="#" className="hover:text-gray-300 pr-5">+92 304 6460307</a>
          </div>

        </div>
      </div>
    </>
  );
};

export default TopBar;
