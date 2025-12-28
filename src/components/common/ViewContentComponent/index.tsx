import React from 'react'

export const ViewContentComponent = ({content}:{content: React.ReactNode}) => {
  return (
    <div className='h-20 w-fit backdrop-blur-lg shadow-xs shadow-gray-900 rounded-md text-white text-sm font-semibold border-black px-3 py-4 z-50 absolute top-2 right-1/4'>
      {content}
    </div>
  )
}
