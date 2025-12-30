'use client';

import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { Trip } from '@/core/schema/trip.schema';
import { updateTrip } from '@/core/api/trip.api';

export const useUpdateTrip = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (
    tripId: string,
    status: Trip['status'],
    onClose?: () => void,
  ) => {
    try {
      setLoading(true);

      await toast.promise(
        updateTrip(tripId, { status }),
        {
          loading: 'Updating status...',
          success: (res) => {
            mutate(`/trips/${tripId}`);
            mutate('/trips');
            mutate('trips/me/pending');
            onClose?.();
            return `Status updated to ${res.status}`;
          },
          error: (err) =>
            err?.response?.data?.message,
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateStatus };
};

