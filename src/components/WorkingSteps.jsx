import React from 'react'

const WorkingSteps = ({ index, step, details }) => {
  return (
    <div className='flex flex-col items-center gap-1 sm:gap-2'>
      
      <div className='flex items-center'>
        <div className='bg-blue-600 inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full'>
          <h1 className='text-white text-lg sm:text-xl md:text-2xl font-bold'>{index}</h1>
        </div>
      </div>
      
      {/* step title */}
      <h3 className='text-sm sm:text-base md:text-lg font-semibold mt-3 sm:mt-4'>{step}</h3>
      
      {/* step details */}
      <p className='text-center text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed px-2'>
        {details}
      </p>
    </div>
  )
}

export default WorkingSteps
