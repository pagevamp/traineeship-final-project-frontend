import { useUser } from '@clerk/nextjs';
import React from 'react'

export const TripHeader = () => {
  const { user } = useUser();

  return (
    <section> 
      <div className="flex items-center gap-2">
      <span className="h-1 w-8 bg-secondary-100 rounded-full" />
      <span className="text-xs font-bold uppercase tracking-widest text-secondary-100">
        For Daily Commuters
      </span>
      </div>  

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-light-text-100/80">
      Trip <span className="text-secondary-100">Dashboard</span>
    </h1>
        <p className="text-light-text-100 mt-2 max-w-md">Manage your personal requests and trips.</p>


    <p className='font-normal text-xl w-full rounded-xl px-6 py-3 mb-2 text-center text-text-one-100/80 bg-secondary-100/60 my-4'> 
      Here are your Pending Trips, <span className='text-primary-100 text-shadow-2xs font-semibold text-shadow-white/20'>{user?.firstName}</span>
    </p>
    </section>
  )
}
