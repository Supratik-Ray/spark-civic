import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FiFileText, FiMenu, FiPlusCircle, FiUser } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
  const navlinkStyle = "flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-gray-500 text-sm lg:text-[15px] font-medium hover:bg-blue-100 rounded-xl transition-all duration-200 ease hover:text-blue-600"

  const activelinkStyle = "bg-blue-600 text-white font-bold flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-sm lg:text-[15px]  rounded-xl transition-all duration-200 ease "

  return (
    <>
      {/* navbar */}
      <nav className='sticky top-0 z-10 border-b border-gray-50 bg-white'>
        <div className='px-4 sm:px-6 md:px-10 lg:px-16 py-3 flex items-center justify-between'>
          {/* logo */}
          <div className='flex gap-2 items-center cursor-pointer'>
            <a href='/' className='h-8 w-8 bg-blue-600 flex items-center justify-center text-white font-bold rounded-[10px] text-xl'>C</a>
            <h2 className='font-semibold text-[16px] sm:text-[18px]'>CivicReport</h2>
          </div>

          {/* navlinks */}
          <div className='hidden md:flex lg:gap-3 md:gap-2'>
            <NavLink
            to="/"
            className={({isActive})=>
              `${
                isActive
                  ? activelinkStyle
                  : navlinkStyle
              } `
            }>
              <FaHome/>
              Home
            </NavLink>

            <NavLink
            to="/report"
            className={({isActive})=>
              `${
                isActive
                  ? activelinkStyle
                  : navlinkStyle
              } `
            }>
              <FiPlusCircle/>
              Report Issue
            </NavLink>

            <NavLink
            to="/my-issues"
            className={({isActive})=>
              `${
                isActive
                  ? activelinkStyle
                  : navlinkStyle
              } `
            }>
              <FiFileText/>
              My Issues
            </NavLink>
          </div>

          {/* right buttons */}
          <div className='flex sm:gap-3 md:gap-4 lg:gap-5'>

            <button className='hidden sm:flex items-center border-[1px] text-gray-700 border-gray-200 px-3 py-1 rounded-[10px] text-xs sm:text-sm font-semibold hover:bg-blue-100 hover:text-blue-600 transition-all duration-100 ease cursor-pointer '>
              Switch to Admin
            </button>
            <button className='hover:bg-blue-100 hover:text-blue-600 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer'>
              <FiUser/>
            </button>
            <button className='md:hidden hover:bg-blue-100 hover:text-blue-600 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer'>
              <FiMenu/>
            </button>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
