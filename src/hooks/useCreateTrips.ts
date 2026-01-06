'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation'; 
import { createTrip } from '@/core/api/trip.api';
import { CreateTripRequest } from '@/core/schema/trip.schema';
import { VehicleType } from '@/core/types/trip-types';

export const useCreateTrip = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const acceptRide = async (rideRequestId: string, vehicleType: VehicleType) => {
    setLoading(true);

    try {
      await toast.promise(
       createTrip({ requestId: rideRequestId, vehicleType } as CreateTripRequest),
        {
          loading: 'Creating trip...',
          success: 'Trip created successfully!',
          error: (err: Error) => {
            if (err?.message) return err.message;
            return 'Creating trip failed due to unknown error';
          },
        }
      );

      // to update SWR cache
      mutate('ride-requests/me/pending');
      mutate('ride-requests');
      mutate('ride-requests/me'); 
      mutate('trips/pending');

      router.push('/trips');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error creating trip: ${error.message}`);
      } else {
        toast.error('Creating trip failed due to unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, acceptRide };
};
