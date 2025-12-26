import { Modal } from '@/components/common/Modal';
import { Trip } from '@/core/types/trip-types';
import Image from 'next/image';
import React, { useState } from 'react'

export const TripModal : React.FC<Trip> = (data: Trip) => {
const [detailsOpen, setDetailsOpen] = useState(false);
    
  return (
    <Modal title="Trip Details" open={detailsOpen} onOpenChange={setDetailsOpen}>
        <div className="flex flex-col gap-2">
            <div className='flex flex-row items-start gap-3 border border-tertiary-100/20 p-4'>
                <Image src={data.passenger.imageUrl} alt='Requester-logo'/>
                <h1>Passenger: {data.passenger.firstName} {data.passenger.lastName}</h1>
            </div>
          
          <p><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</p>
          <p><strong>Pickup:</strong> {data.ride.pickupLocation}</p>
          <p><strong>Destination:</strong> {data.ride.destination}</p>
          <p><strong>Landmark:</strong> {data.ride.landmark}</p>

        </div>
    </Modal>
  )
}
