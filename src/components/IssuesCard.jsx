import React from 'react'

const IssuesCard = ({text, num, icon: Icon}) => {
  return (
    <div className='flex items-center justify-between border-[1px] border-gray-100 bg-white py-7 px-5'>
      <div>
        <p>{text}</p>
        <h2>{num}</h2>
      </div>
      <div className='h-5 w-5 '>
        <Icon/>
      </div>
    </div>
  )
}

export default IssuesCard
