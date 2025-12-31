'use client';

import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { updateTrip } from '@/core/api/trip.api';
import { TripStatus } from '@/core/types/trip-types';

export const useUpdateTrip = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (
    tripId: string,
    status: TripStatus,
    onClose?: () => void,
  ) => {
    try {
      setLoading(true);

      toast.promise(
        updateTrip(tripId, { status }),
        {
          loading: 'Updating status...',
          success: (res) => {
            mutate(`trips/${tripId}`);
            mutate('trips');
            mutate('trips/me/pending');
            onClose?.();
            return `Status updated to ${res.status}`;
          },
          error: (err) => err ? err?.response?.data?.message : 'Trip updates successfully',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateStatus };
};

