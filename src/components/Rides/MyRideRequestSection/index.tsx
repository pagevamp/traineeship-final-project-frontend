'use client';
import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { ViewDetails } from '../ViewDetails';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { Ride } from '../../../../types/Ride';

export const MyRideRequestsSection = () => {
  const ridesData: Ride[] = [
    {
      id: '3ff23a36-9f55-472d-b2a9-1e13456e5757',
      passengerId: 'user_37CEl7rk6l3pMjAF4jJUmSA6fkP',
      destination: 'Balaju',
      landmark: 'Outside',
      driver: {
        firstName: 'KP',
        lastName: 'Baa',
        phoneNumber: null, // add phone if available
      },
      status: 'not_started',
      pickupLocation: 'Naikap',
      notes: 'I have two large suitcases. Please call upon arrival.',
      departureTime: {
        start: '2025-12-24 08:00:00+00',
        end: '2025-12-24 09:30:00+00',
      },
      acceptedAt: '2025-12-24 08:00:00+00',
      passenger: {
        firstName: 'Hidden',
        lastName: 'Name',
        profileImage:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zN0NFbDM4R2NrS0lMVjhGTHJwRlUxSHVVaWkifQ',
        phoneNumber: '8828828888',
      },
      createdAt: '2025-12-23T11:47:41.534Z',
    },
    {
      id: '3ff23a-9f55-472d-b2a9-1e13456e5757',
      passengerId: 'user_37CEl7rk6l3pMjAF4jJUmSA6fkP',
      destination: 'Naikap',
      landmark: 'Outside',
      driver: null, // no driver assigned yet
      status: 'not_started',
      pickupLocation: 'Outside',
      notes: 'I have two large suitcases. Please call upon arrival.',
      departureTime: {
        start: '2025-12-24 08:00:00+00',
        end: '2025-12-24 09:30:00+00',
      },
      acceptedAt: null,
      passenger: {
        firstName: 'Hidden',
        lastName: 'Name',
        profileImage:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zN0NFbDM4R2NrS0lMVjhGTHJwRlUxSHVVaWkifQ',
        phoneNumber: '8828828888',
      },
      createdAt: '2025-12-23T11:47:41.534Z',
    },
  ];

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleEditRide = (id: string) => {
    console.log('Navigate to Edit Form or Open Edit Modal for:', id);
  };

  const handleCancelRide = (id: string) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this ride request?');
    if (confirmCancel) {
      console.log('Ride Request Cancelled:', id);
    }
  };

  const handleViewDetails = (ride: Ride) => {
    setSelectedRide(ride);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-6 rounded-2xl">
      <div className="flex flex-col gap-6 justify-center items-center">
        {ridesData.map((ride) => (
          <MyRideRequestCard
            key={ride.id}
            ride={ride}
            onEdit={handleEditRide}
            onCancel={handleCancelRide}
            onViewDetails={() => handleViewDetails(ride)}
          />
        ))}
      </div>

      {selectedRide && (
        <Modal title="Ride Request Details" open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <ViewDetails
            onCancel={handleCancelRide}
            isOwnRide={true}
            ride={selectedRide}
            onEdit={handleEditRide}
            onAccept={() => console.log('Ride Cancelled')}
          />
        </Modal>
      )}
    </div>
  );
};
