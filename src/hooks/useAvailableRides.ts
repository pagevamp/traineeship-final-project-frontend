import useSWR from 'swr';
import { getRides } from '@/core/api/ride.api';
import { Ride } from '@/core/types/Ride';

export function useAvailableRides() {
  const { data, error, isLoading } = useSWR<Ride[]>('ride-requests', getRides);

  const acceptRide = async (id: string) => {
    console.log('Accepting ride:', id);
  };

  return {
    rides: data ?? [],
    isLoading,
    error,
    acceptRide,
  };
}
