import { Ride, RideTab } from '@/core/types/Ride';
import { useState } from 'react';

export function useRideRequests() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [activeTab, setActiveTab] = useState<RideTab>('all');

  const handleAcceptRide = (id: string) => {
    console.log('Ride Accepted:', id);
  };

  return {
    rides,
    setRides,
    handleAcceptRide,
    selectedRide,
    setSelectedRide,
    activeTab,
    setActiveTab,
  };
}
