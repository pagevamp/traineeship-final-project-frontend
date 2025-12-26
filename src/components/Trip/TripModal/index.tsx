import { Modal } from '@/components/common/Modal';
import { Trip } from '@/core/types/trip-types';
import React, { useState } from 'react'

export const TripModal : React.FC<Trip> = (data: Trip) => {
const [detailsOpen, setDetailsOpen] = useState(false);
    
  return (
    <Modal title="Trip Details" open={detailsOpen} onOpenChange={setDetailsOpen}>
        <div className="flex flex-col gap-2">
          <p><strong>Pickup:</strong> {data.ride.pickupLocation}</p>
          <p><strong>Destination:</strong> {data.ride.destination}</p>
          <p><strong>Passenger:</strong> {data.passenger.firstName} {data.passenger.lastName}</p>
          <p><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</p>
          {/* Add more details as needed */}
        </div>
    </Modal>
  )
}
