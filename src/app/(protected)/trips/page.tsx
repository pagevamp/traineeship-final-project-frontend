'use client'
import { TripCard } from '@/components/Trip/TripCard';
import { Ride } from '@/core/types/Ride';
import { dummyRide } from '@public/data/dummyData';
import React from 'react';

interface TripCardProps {
  ride: Ride;
  onCancel: (id: string) => void;
  onAccept: (id: string, type: 'two-wheeler' | 'four-wheeler') => void;
}

const Trips = () => {
  const handleCancel = (id: string) => {
    console.log('Cancel ride:', id);
  };

  const handleAccept = (id: string, type: 'two-wheeler' | 'four-wheeler') => {
    console.log('Accept ride:', id, 'as', type);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <TripCard
        ride={dummyRide}
        onCancel={handleCancel}
        onAccept={handleAccept}
      />
    </div>
  );
};

export default Trips;
