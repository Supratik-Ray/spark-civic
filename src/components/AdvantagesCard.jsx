import React from 'react'

const AdvantagesCard = ({ icon: Icon, pros, desc }) => {
  return (
    <div className='bg-white p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 rounded-[10px] border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-200'>
      
      {/* icon */}
      <div className='bg-blue-100 p-2.5 sm:p-3.5 rounded-full'>
        <Icon className='text-blue-600 text-lg sm:text-xl md:text-2xl' />
      </div>

      {/* heading */}
      <h3 className='font-semibold text-sm sm:text-base md:text-lg text-center'>{pros}</h3>

      {/* description */}
      <p className='text-center text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed'>
        {desc}
      </p>
    </div>
  )
}

export default AdvantagesCard
