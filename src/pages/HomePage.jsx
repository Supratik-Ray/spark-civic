//Riya ekahne paste korish tor code ar components gulo component folder e
import React from 'react'
import { FiUser, FiMenu, FiShield, FiArrowRight, FiClock, FiCheck, FiUsers } from "react-icons/fi"
import IssuesCard from '../components/IssuesCard'
import AdvantagesCard from '../components/AdvantagesCard'
import WorkingSteps from '../components/WorkingSteps'

const HomePage = () => {
  return (
    <div className='bg-[#d6e3ff] font-["system-ui",sans-serif]'>
      {/* navbar */}
      <nav className='flex items-center justify-between p-3 bg-white '>
        <div className='bg-blue-600 rounded-[10px] h-8 w-8 cursor-pointer flex items-center justify-center'>
          <h2 className='text-xl text-white font-bold'>C</h2>
        </div>
        <div className='flex gap-5'>
          <span className='hover:bg-blue-100 hover:text-blue-600  h-10 w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer'>
            <FiUser/>
          </span>
          <span className='hover:bg-blue-100 hover:text-blue-600  h-10 w-10 flex items-center justify-center rounded-[10px] transition-all duration-100 ease cursor-pointer'>
            <FiMenu/>
          </span>
        </div>
      </nav>

      {/* empower your city */}
      <article className='px-12 py-20 flex flex-col bg-[#EEF3F9]'>
          <div className='flex justify-center'>
            <div className='inline-flex items-center justify-center text-blue-700 bg-[#E6F1FE] rounded-[20px] text-sm px-4 py-2 font-600 '>
              <span><FiShield/></span>
              <span>Trusted by 50+ Municipalities</span>
            </div>
          </div>

        <h1 className='my-11 text-[34px] font-[780]'>
          Empower Your City with
          <span className='text-blue-600'> Smart Issue Reporting</span>
        </h1>

        <p className='text-xl text-center text-gray-500 mb-10'>Connect citizens with municipal services. Report, track, and resolve civic issues efficiently with our comprehensive platform designed for modern cities.</p>

        <div className='flex flex-col items-center justify-center gap-6'>
          <button className='text-white text-sm flex items-center justify-center py-3 px-10 bg-blue-600 w-full rounded-[10px] hover:scale-105 transition-all duration-300 ease-in-out'>
            Report an Issue <span><FiArrowRight/></span>
          </button>

          <button className='bg-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease text-sm border-[1px] border-gray-200 py-3 px-10 w-full rounded-[10px]'>
            View Dashboard
          </button>
        </div>
      </article>

      <article>
        <IssuesCard text="Total Issues Reported" num="156" icon={FiCheck} />
        <IssuesCard text="Issues Resolved" num="89" icon={FiCheck} />
        <IssuesCard text="Average Resolution Time" num="3.5 days" icon={FiClock} />
        <IssuesCard text="Active Citizens" num="1,234" icon={FiUsers} />
      </article>

      <article>
        <h2>Why Choose CivicReport?</h2>
        <p>Our platform bridges the gap between citizens and city services with powerful features</p>
        <AdvantagesCard/>
        <AdvantagesCard/>
        <AdvantagesCard/>
        <AdvantagesCard/>
      </article>

      <article>
        <h2>How It Works</h2>
        <p>Simple 4-step process from issue reporting to resolution</p>
        <div>
          <WorkingSteps/>
          <WorkingSteps/>
          <WorkingSteps/>
          <WorkingSteps/>
        </div>
      </article>

      <article>
        <section>
          <h2>Ready to Transform Your City?</h2>
          <p>Join thousands of citizens making their communities better, one issue at a time.</p>
          <button>Get Started Now <span><FiArrowRight/></span></button>
        </section>
      </article>
    </div>
  )
}

export default HomePage
