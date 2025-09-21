import React, { useRef, useState } from 'react'
import UserReportStats from '../components/UserReportStats'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import CitizenIssueCard from '../components/CitizenIssueCard'

const AllIssuesPage = () => {
  const searchRef = useRef(null)
  const [status, setStatus] = useState("allStatus")

  const options = [
    { value: "allStatus", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "inProgress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ]

  return (
    <div className=' py-10 px-20'>
      <h1 className=' text-3xl font-bold'>All Reported Issues</h1>
      <h4 className='text-gray-600 text-[16px]'>Track the status of all civic reports</h4>
      <div className=' py-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <UserReportStats status="Total Issues" num={3}/>
        <UserReportStats status="Pending" num={3}/>
        <UserReportStats status="In Progress" num={3}/>
        <UserReportStats status="Resolved" num={3}/>
      </div>
      
      <form className=' py-3 flex gap-4'>
        <label className='border-1 border-gray-300 rounded-md flex-1 flex items-center py-2 px-3 gap-4'>
          <FaSearch 
            className='font-extralight text-gray-500 cursor-pointer' 
            onClick={()=> searchRef.current.focus()}
          />
          <input 
            type="text" 
            ref={searchRef}
            placeholder='Search issues...'
            className=' flex-1 text-md text-gray-800 outline-0'
          />
        </label>

        <div className='relative border-1 border-gray-300 rounded-md py-2 px-3 w-48 flex items-center justify-between cursor-pointer'>
          <span className='text-sm text-gray-700'>
            {options.find(opt => opt.value === status)?.label}
          </span>
          <FaChevronDown className='text-gray-400 font-extralight text-xs'/>
          
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className=' grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
        <CitizenIssueCard type="road" title="Large pothole on Main Street" ticket="TKT-2024-001" status="In Progress" desc="There is a dangerous pothole near the intersection of Main St and 5th Ave. Multiple vehicles have been damaged." ward={3} userName="John Citizen" votes={42} assignedTo="Mike Staff" />

        <CitizenIssueCard type="electricity" title="Street light not working" ticket="TKT-2024-003" status="Pending" desc="Street light at Park Street has been out for a week. Area is very dark at night." ward={2} userName="David Lee" votes={15} assignedTo="" />

        <CitizenIssueCard type="road" title="Broken sidewalk near school" ticket="TKT-2024-005" status="Resolved" desc="Sidewalk is cracked and uneven, creating trip hazard for students." ward={3} userName="Michael Brown" votes={89} assignedTo="" />
      </div>
    </div>
  )
}

export default AllIssuesPage