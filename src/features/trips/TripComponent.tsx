import { TripCard } from '@/components/Trip/TripCard'
import { TripHeader } from '@/components/Trip/TripHeader';
import { dummyTrip } from '@public/data/dummyData';
import React from 'react'

export const TripComponent = () => {

    const data = dummyTrip
    const handleCancel = (id: string) => {
    console.log('Cancel ride:', id);
  };

  const handleAccept = (id: string, type: 'two_wheeler' | 'four_wheeler') => {
    console.log('Accept ride:', id, 'as', type);
  };
  return (
    <div className='flex flex-col'>
        <TripHeader/>
    
    <TripCard
            data = {data}
            onCancel={handleCancel}
            onAccept={handleAccept}
    />
    </div>
  )
}
