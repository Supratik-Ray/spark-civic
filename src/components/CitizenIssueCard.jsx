import React from 'react'
import { AiOutlineClockCircle, AiOutlineLike } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'
import roadImG from '../assets/road.png'
import elecImage from '../assets/electricity.png'

const CitizenIssueCard = ({ type, title, ticket, status, desc, ward, userName, votes, assignedTo}) => {
  let imageSrc
  if(type==="road"){
    imageSrc = roadImG
  }else if(type==="electricity"){
    imageSrc = elecImage
  }

  let statStyle
  if(status==="In Progress"){
    statStyle = 'text-[13px] text-orange-500 font-semibold bg-orange-100 px-2 rounded-2xl border-1 border-orange-300'
  } else if(status==="Pending"){
    statStyle = 'text-[13px] text-blue-500 font-semibold bg-blue-100 px-2 rounded-2xl border-1 border-blue-300'
  }else if(status==="Resolved"){
    statStyle = 'text-[13px] text-green-500 font-semibold bg-green-100 px-2 rounded-2xl border-1 border-green-300'
  }

  return (
    <div className='rounded-xl p-7 shadow-md hover:shadow-2xl hover:scale-102 transition-all duration-400 border-1 border-gray-300 cursor-pointer'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
            <img 
                src={imageSrc} 
                alt="type" 
                className='h-7 w-7 rounded-sm'
            />
            <div>
                <h3 className='text-[16px] font-semibold'>{title}</h3>
                <h5 className='text-xs text-gray-500'>{ticket}</h5>
            </div>
        </div>
        <div>
            <div className={statStyle}>
                <p>{status}</p>
            </div>
        </div>
      </div>
      
      <p className='text-sm text-gray-500 py-4'>{desc}</p>

      <div className='border-b-1 border-gray-300 pb-3 flex justify-between text-gray-600 text-xs'>
        <div className='flex items-center gap-1'>
            <FaLocationPin/>
            <p>Ward {ward}</p>
        </div>
        <div className='flex items-center gap-1'>
            <AiOutlineClockCircle className='text-xs'/>
            <p>over 1 year ago</p>
        </div>
        <div className='flex items-center gap-1'>
            <FaUser/>
            <p>{userName}</p>
        </div>
        <div className='flex items-center gap-1'>
            <AiOutlineLike/>
            <p>{votes} votes</p>
        </div>
      </div>
      <div className='pt-1'>
        <span className='text-xs text-gray-500'>Assigned to:
            <span className='text-black font-semibold'> {assignedTo}</span></span>
      </div>
    </div>
  )
}

export default CitizenIssueCard
