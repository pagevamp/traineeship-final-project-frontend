import { Ride, RideTab } from '@/core/types/Ride';
import { useState } from 'react';
import { useModal } from './useViewModal';
import { deleteRide, getMyPendingRides, getMyRidsStatus } from '@/core/api/ride.api';
import useSWR, { mutate } from 'swr';
import { Trip } from '@/core/types/Trip';
import { getAcceptedTrips } from '@/core/api/trip.api';
import { toast } from 'sonner';

export function useMyRideRequests() {
  const [activeTab, setActiveTab] = useState<RideTab>('all');

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const { close } = useModal();

  const {
    data: ridesData = [],
    isLoading: ridesLoading,
    error: ridesError,
  } = useSWR<Ride[]>('ride-requests/me/pending', getMyPendingRides);

  // Only check status IF we have rides (Dependent Fetch)
  // If ridesData is empty, don't need to waste an API call on getMyRidsStatus
  const hasRides = ridesData.length > 0;
  const { data: isAccepted, isLoading: statusLoading } = useSWR<boolean>(
    hasRides ? '/ride-requests/me/status' : null,
    getMyRidsStatus,
  );

  // 3. Only fetch trips IF the status is officially 'accepted'
  const { data: tripsData = [], isLoading: tripsLoading } = useSWR<Trip[]>(
    isAccepted ? 'trips/accepted' : null,
    getAcceptedTrips,
  );

  const isLoading = ridesLoading || (hasRides && statusLoading) || (isAccepted && tripsLoading);

  const onConfirmCancel = async () => {
    if (!selectedRide) return;

    try {
      toast.promise(deleteRide(selectedRide.id), {
        loading: 'Cancelling your ride request...',
        success: () => {
          mutate('ride-requests/me/pending');
          mutate('trips/accepted');
          close();
          return 'Ride request cancelled.';
        },
        error: (err) => err?.response?.data?.message || 'Failed to cancel ride',
      });
    } catch (err) {
      console.error(err);
    } finally {
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
