import React from 'react'

const UserReportStats = ({ status, num}) => {
    let statStyle=""
  if(status==="Total Issues"){
    statStyle = " border-1 rounded-xl p-4 border-gray-300 text-gray-700 bg-white"
  }else if(status==="Pending"){
    statStyle = " border-1 rounded-xl p-4 border-blue-300 text-blue-500 bg-blue-100"
  }else if(status==="In Progress"){
    statStyle = " border-1 rounded-xl p-4 border-orange-300 text-orange-500 bg-orange-100"
  }else if(status === "Resolved"){
    statStyle = " border-1 rounded-xl p-4 border-green-300 text-green-500 bg-green-100"
  }
  return (
    <div className={statStyle}>
      <p className=' text-sm'>{status}</p>
      <h2 className='text-2xl font-bold'>{num}</h2>
    </div>
  )
}

export default UserReportStats
