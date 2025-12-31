import { Ride, RideTab } from '@/core/types/Ride';
import { useState } from 'react';
import { deleteRide, getMyPendingRides, getMyRidsStatus } from '@/core/api/ride.api';
import useSWR, { mutate } from 'swr';
import { getAcceptedTrips } from '@/core/api/trip.api';
import { toast } from 'sonner';
import { Trip } from '@/core/schema/trip.schema';

export function useMyRideRequests(close: () => void) {
  const [activeTab, setActiveTab] = useState<RideTab>('all');

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const {
    data: ridesData = [],
    isLoading: ridesLoading,
    error: ridesError,
  } = useSWR<Ride[]>('ride-requests/me/pending', getMyPendingRides);

  // Only check status IF we have rides (Dependent Fetch)
  // If ridesData is empty, don't need to waste an API call on getMyRidsStatus
  const hasRides = ridesData.length > 0;
  const { data: isAccepted, isLoading: statusLoading } = useSWR<boolean>(
    hasRides ? null : '/ride-requests/me/status',
    getMyRidsStatus,
  );

  // Only fetch trips IF the status is officially 'accepted'
  const { data: tripsData = [], isLoading: tripsLoading } = useSWR<Trip[]>(
    isAccepted ? 'trips/accepted' : null,
    getAcceptedTrips,
  );

  const isLoading = ridesLoading || (hasRides && statusLoading) || (isAccepted && tripsLoading);

  const onConfirmCancel = async () => {
    if (!selectedRide) {
      close();
      return;
    }
    try {
      await toast.promise(deleteRide(selectedRide.id), {
        loading: 'Cancelling your ride request...',
        success: () => {
          close();
          return 'Ride request cancelled.';
        },
        error: (err) => err?.response?.data?.message || 'Failed to cancel ride',
      });
    } catch (err) {
      console.error(err);
    } finally {
      close();
      await mutate('trips/accepted');
      await mutate('ride-requests/me/pending');
    }
  };

  return {
    onConfirmCancel,
    ridesData,
    ridesError,
    isLoading,
    ridesLoading,
    tripsData,
    tripsLoading,
    selectedRide,
    setSelectedRide,
    activeTab,
    setActiveTab,
  };
}
