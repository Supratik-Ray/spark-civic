import React, { useState } from "react";
import { FaHome, FaMap } from "react-icons/fa";
import {
  FiFileText,
  FiLogOut,
  FiMenu,
  FiPlusCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { session, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function onLogout() {
    await logout();
    setIsOpen(false);
    toast.success("Successfully logged out!");
  }

  const navlinkStyle =
    "flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-gray-500 text-sm lg:text-[15px] font-medium hover:bg-blue-100 rounded-xl transition-all duration-200 ease hover:text-blue-600";

  const activelinkStyle =
    "bg-blue-600 text-white font-bold flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-sm lg:text-[15px]  rounded-xl transition-all duration-200 ease ";

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-300 bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-3 flex items-center justify-between">
        {/* logo */}
        <div
          onClick={() => navigate("/")}
          className="flex gap-2 items-center cursor-pointer"
        >
          <div className="h-8 w-8 bg-blue-600 flex items-center justify-center text-white font-bold rounded-[10px] text-xl">
            C
          </div>
          <h2 className="font-semibold text-[16px] sm:text-[18px]">
            CivicReport
          </h2>
        </div>

        {/* citizen navlinks */}
        {profile?.role !== "admin" && (
          <div className="hidden md:flex lg:gap-3 md:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <FaHome />
              Home
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <FiPlusCircle />
              Report Issue
            </NavLink>

            <NavLink
              to="/all-issues"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <FiFileText />
              All Issues
            </NavLink>
          </div>
        )}

        {/* admin navlinks */}
        {profile?.role === "admin" && (
          <div className="hidden md:flex lg:gap-3 md:gap-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <MdDashboard />
              Dashboard
            </NavLink>

            <NavLink
              to="/map-view"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <FaMap />
              Map View
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${isActive ? activelinkStyle : navlinkStyle}`
              }
            >
              <GrAnalytics />
              Analytics
            </NavLink>
          </div>
        )}

        {/* right buttons */}
        <div className="relative flex sm:gap-3 md:gap-4 lg:gap-5">
          {!session && (
            <button
              onClick={() => navigate("/auth/login")}
              className="hidden sm:flex items-center border text-gray-700 border-gray-200 px-3 py-1 rounded-[10px] text-xs sm:text-sm font-semibold hover:bg-blue-100 hover:text-blue-600 transition-all duration-100 ease cursor-pointer "
            >
              Login
            </button>
          )}

          {session && (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:bg-blue-100 hover:text-blue-600 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer"
              >
                <FiUser />
              </button>

              {isOpen && (
                <div className="absolute right-1.5 mt-11 border shadow-xl rounded-xl p-1 bg-white border-gray-200 w-48">
                  <ul>
                    <li className="text-sm font-semibold px-4 rounded-lg py-2">
                      My Account
                    </li>
                    <hr className="text-gray-400 my-[1px] opacity-60" />
                    <li className="flex items-center gap-3 text-sm px-4 rounded-lg py-1.5 hover:bg-blue-200 transition-all duration-200 cursor-pointer hover:text-blue-600">
                      <FiUser />
                      Profile
                    </li>
                    <li className="flex items-center gap-3 text-sm px-4 rounded-lg py-1.5 hover:bg-blue-200 transition-all duration-200 cursor-pointer hover:text-blue-600">
                      <FiSettings />
                      Settings
                    </li>
                    <hr className="text-gray-400 my-[1px] opacity-60" />
                    <li
                      onClick={onLogout}
                      className="flex items-center gap-3 px-4 text-red-600 text-sm py-1.5 rounded-lg hover:bg-blue-200 transition-all duration-200 ease cursor-pointer"
                    >
                      <FiLogOut /> Log out
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          <button className="md:hidden hover:bg-blue-100 hover:text-blue-600 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer">
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
