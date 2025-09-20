
import React from 'react'
import { FiUser, FiMenu, FiShield, FiArrowRight, FiClock, FiCheckCircle, FiUsers, FiPlusCircle, FiFileText } from "react-icons/fi"
import { FaBolt, FaChartBar, FaHome, FaMapMarkerAlt } from 'react-icons/fa'
import IssuesCard from '../components/IssuesCard'
import AdvantagesCard from '../components/AdvantagesCard'
import WorkingSteps from '../components/WorkingSteps'

const HomePage = () => {
  return (
    <div className='bg-[#F3F7FC] font-sans '>
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
            <button className='flex items-center px-3 lg:px-4 py-1.5 bg-blue-600 gap-2 rounded-[10px] text-white text-sm lg:text-[15px] font-semibold cursor-pointer'>
              <FaHome/>
              Home
            </button>
            <button className='flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-gray-500 text-sm lg:text-[15px] font-medium hover:bg-blue-100 rounded-xl transition-all duration-200 ease hover:text-blue-600'>
              <FiPlusCircle/>
              Report Issue
            </button>
            <button className='flex cursor-pointer items-center gap-2 px-3 lg:px-4 py-1.5 text-gray-500 text-sm lg:text-[15px] font-medium hover:bg-blue-100 rounded-xl transition-all duration-200 ease hover:text-blue-600'>
              <FiFileText/>
              My Issues
            </button>
          </div>

          {/* right buttons */}
          <div className='flex sm:gap-3 md:gap-4 lg:gap-5'>
            <button className='hidden sm:flex items-center border-[1px] text-gray-700 border-gray-200 px-3 py-1 rounded-[10px] text-xs sm:text-sm font-semibold hover:bg-blue-100 hover:text-blue-600 transition-all duration-100 ease cursor-pointer'>
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

      {/* empower your city */}
      <article className='px-10 md:px-16 lg:px-[27%] py-12 sm:py-16 md:py-20 flex flex-col items-center bg-[#EBF1FA]'>
        <div className='flex justify-center'>
          <div className='inline-flex items-center gap-2 justify-center text-blue-600 bg-[#dcebfe] rounded-[20px] text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 font-semibold '>
            <span className='text-base sm:text-lg'><FiShield/></span>
            <span>Trusted by 50+ Municipalities</span>
          </div>
        </div>

        <div className='my-6 text-center font-extrabold text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] leading-snug'>
          <p>Empower Your City with</p>
          <p className='text-blue-600'> Smart Issue Reporting</p>
        </div>

        <p className='text-base sm:text-lg md:text-xl text-center text-gray-500 mb-10 md:w-[80%]'>
          Connect citizens with municipal services. Report, track, and resolve civic issues efficiently with our comprehensive platform designed for modern cities.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full'>
          <button className='text-white text-sm sm:text-base flex items-center justify-center py-3 px-8 sm:px-10 bg-blue-600 w-full rounded-[10px] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer font-semibold'>
            Report an Issue <span><FiArrowRight/></span>
          </button>
          <button className='bg-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease text-sm sm:text-base border-[1px] border-gray-200 py-3 px-8 sm:px-10 w-full rounded-[10px] cursor-pointer font-semibold'>
            View Dashboard
          </button>
        </div>
      </article>

      {/* stats */}
      <article className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 px-10 md:px-12 lg:px-24 py-12 sm:py-18'>
        <IssuesCard text="Total Issues Reported" num="156" icon={FiCheckCircle} />
        <IssuesCard text="Issues Resolved" num="89" icon={FiCheckCircle} />
        <IssuesCard text="Average Resolution Time" num="3.5 days" icon={FiClock} />
        <IssuesCard text="Active Citizens" num="1,234" icon={FiUsers} />
      </article>

      {/* why choose */}
      <article className='py-12 sm:py-18 px-10 md:px-12 lg:px-24'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center'>Why Choose CivicReport?</h2>
        <p className='text-center text-gray-500 my-4 text-sm sm:text-base'>Our platform bridges the gap between citizens and city services with powerful features</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <AdvantagesCard icon={FaMapMarkerAlt} pros="GPS-Enabled Reporting" desc="Pinpoint exact locations of civic issues with integrated maps"/>
          <AdvantagesCard icon={FaBolt} pros="Real-time Updates" desc="Track issue status from report to resolution instantly"/>
          <AdvantagesCard icon={FaChartBar} pros="Data Analytics" desc="Visualize trends and patterns to improve city services"/>
          <AdvantagesCard icon={FiUsers} pros="Community Driven" desc="Citizens and officials working together for better cities"/>
        </div>
      </article>

      {/* how it works */}
      <article className='bg-white py-12 sm:py-18 px-10 sm:px-12 lg:px-24 flex flex-col gap-5'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold'>How It Works</h2>
        <p className='text-center text-gray-500 text-sm sm:text-base md:pb-8'>Simple 4-step process from issue reporting to resolution</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10'>
          <WorkingSteps index={1} step="Report" details="Citizens report issues with photos and location"/>
          <WorkingSteps index={2} step="Assign" details="Municipal staff reviews and assigns to teams"/>
          <WorkingSteps index={3} step="Resolve" details="Issues are fixed and marked as resolved"/>
          <WorkingSteps index={4} step="Verify" details="Citizens confirm resolution and provide feedback"/>
        </div>
      </article>

      <article className='bg-[#EAF2FD] px-10 md:px-12 lg:px-24 py-12 sm:py-18'>
        <section className='w-full bg-blue-500 py-10 sm:py-12 rounded-xl flex flex-col items-center gap-4 sm:gap-6 px-4 text-center'>
          <h2 className='text-white text-2xl sm:text-3xl font-bold'>Ready to Transform Your City?</h2>
          <p className='text-white text-sm sm:text-base'>Join thousands of citizens making their communities better, one issue at a time.</p>
          <button className='bg-white flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl hover:bg-blue-100 transition-all duration-200 ease cursor-pointer'>
            Get Started Now <span><FiArrowRight/></span>
          </button>
        </section>
      </article>
    </div>
  )
}

export default HomePage
