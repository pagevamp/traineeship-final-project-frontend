'use client';
import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { RideRequestCard } from '@/components/Rides/RideRequest/RideRequestCard';
import { Ride } from '../../../../../types/Ride';
import { ViewDetails } from '../../ViewDetails';

export const RideRequestsSection = () => {
  const ridesData: Ride[] = [
    {
      id: '3ff23a36-9f55-472d-b2add9-1e13456e5757',
      passengerId: 'user_37CEl7rk6l3pMjAF4jJUmSA6fkP',
      destination: 'Balaju',
      landmark: 'Outside',
      driver: {
        firstName: 'KP',
        lastName: 'Baa',
        phoneNumber: null,
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
      id: '3ff23a36-9f55-472d-b2dda9-1e13456e5757',
      passengerId: 'user_37CEl7rk6l3pMjAF4jJUmSA6fkP',
      destination: 'Balaju',
      landmark: 'Outside',
      driver: {
        firstName: 'KP',
        lastName: 'Baa',
        phoneNumber: '99399399399',
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
  ];

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAcceptRide = (id: string) => {
    console.log('Ride Accepted:', id);
  };

  return (
    <div className=" p-6 rounded-2xl">
      <div className="flex flex-col gap-6 justify-center items-center ">
        {ridesData.map((ride) => (
          <RideRequestCard
            key={ride.id}
            ride={ride}
            onAccept={handleAcceptRide}
            onClick={() => {
              setSelectedRide(ride);
              setIsOpen(true);
            }}
          />
        ))}
      </div>

      {selectedRide && (
        <Modal title="Ride Request Details" open={isOpen} onOpenChange={setIsOpen}>
          <ViewDetails isOwnRide={false} onAccept={handleAcceptRide} ride={selectedRide} />
        </Modal>
      )}
    </div>
  );
};
