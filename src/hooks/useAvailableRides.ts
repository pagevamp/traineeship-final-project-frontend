import useSWR from 'swr';
import { getRides } from '@/core/api/ride.api';
import { Ride } from '@/core/types/Ride';
import { useState } from 'react';
import { useModal } from './useViewModal';

export function useAvailableRides() {
  const { open, close, isViewing } = useModal();
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const handleSelectRide = (ride: Ride) => {
    setSelectedRide(ride);
    open('viewing');
  };

  const handleAcceptRide = (id: string) => {
    console.log('Ride Accepted:', id);
    close();
  };

  const { data: ridesData = [], error, isLoading } = useSWR<Ride[]>('ride-requests', getRides);

  return {
    close,
    isViewing,
    handleSelectRide,
    handleAcceptRide,
    ridesData,
    isLoading,
    error,
    selectedRide,
    setSelectedRide,
  };
}
