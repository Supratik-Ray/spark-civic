import React, { useState, useEffect } from "react";
import { FaHome, FaMap } from "react-icons/fa";
import { FiFileText, FiLogOut, FiMenu, FiPlusCircle } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { session, profile, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu when resizing to >= md (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // run once in case component mounts on large screen
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function onLogout() {
    await logout();
    setIsMobileOpen(false);
    toast.success("Successfully logged out!");
  }

  const navlinkStyle =
    "flex cursor-pointer items-center gap-2 px-3 py-2 text-gray-500 text-sm font-medium hover:bg-blue-100 rounded-xl transition-all duration-200 ease hover:text-blue-600";
  const activelinkStyle =
    "bg-blue-600 text-white font-bold flex cursor-pointer items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all duration-200 ease";

  const CitizenLinks = ({ mobile = false }) => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FaHome /> Home
      </NavLink>
      <NavLink
        to="/report"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FiPlusCircle /> Report Issue
      </NavLink>
      <NavLink
        to="/issues"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FiFileText /> All Issues
      </NavLink>
      <NavLink
        to="/map-view"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FaMap /> Map View
      </NavLink>
      <NavLink
        to="/myIssues"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <MdDashboard /> My Issues
      </NavLink>
    </>
  );

  const AdminLinks = ({ mobile = false }) => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FaHome /> Home
      </NavLink>
      <NavLink
        to="/issues"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FiFileText /> All Issues
      </NavLink>
      <NavLink
        to="/map-view"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <FaMap /> Map View
      </NavLink>
      <NavLink
        to="/assignedIssues"
        className={({ isActive }) =>
          isActive ? activelinkStyle : navlinkStyle
        }
        onClick={() => mobile && setIsMobileOpen(false)}
      >
        <MdDashboard /> Assigned Issues
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-300 bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-3 flex items-center justify-between relative">
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

        {/* desktop navlinks */}
        <div className="hidden md:flex gap-3">
          {profile?.role === "admin" ? <AdminLinks /> : <CitizenLinks />}
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          {!session && (
            <button
              onClick={() => navigate("/auth/login")}
              className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-all duration-150 ease-in-out cursor-pointer"
            >
              Login
            </button>
          )}

          {session && (
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-red-600 hover:bg-red-100 transition-all duration-150 ease-in-out cursor-pointer"
            >
              <FiLogOut /> Logout
            </button>
          )}

          {/* mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden hover:bg-blue-100 hover:text-blue-600 h-9 w-9 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* mobile dropdown overlay — hidden on md+ via md:hidden */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 w-full z-20 bg-white shadow-md border-t border-gray-200 px-4 py-3 flex flex-col gap-2 md:hidden">
          {profile?.role === "admin" ? (
            <AdminLinks mobile />
          ) : (
            <CitizenLinks mobile />
          )}

          {session ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 rounded-lg hover:bg-red-100 transition-all duration-150 ease-in-out cursor-pointer"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/auth/login");
                setIsMobileOpen(false);
              }}
              className="flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-all duration-150 ease-in-out cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
