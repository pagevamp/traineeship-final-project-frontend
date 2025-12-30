import { Icon } from '@iconify/react'
import React from 'react'

const Directory = () => {
  return (
    <div className='relative flex flex-col items-center border-2 border-secondary-100 rounded-xl w-full md:w-2/3 lg:w-2/4 p-4 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% transition-all duration-300' >
       
        <Icon icon='eos-icons:hourglass' width={64} height={64}/>
        <p className='text-2xl'> Under Development</p>
    </div>
  )
}

export default Directory

