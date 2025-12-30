'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { createTrip } from '@/core/api/trip.api';
import { CreateTripRequest } from '@/core/schema/trip.schema';
import { VehicleType } from '@/core/types/trip-types';

export const useCreateTrip = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const acceptRide = async (rideRequestId: string, vehicleType: VehicleType) => {
    try {
      setLoading(true);

      const trip = await toast.promise(
        createTrip({ requestId: rideRequestId, vehicleType } as CreateTripRequest),
        {
          loading: 'Creating trip...',
          success: 'Trip created successfully!',
          error: (err) => err?.response?.data?.message,
        }
      );

      mutate('trips/me/pending');
      mutate('rides/') 

      return trip;
    } catch (error) {
      if(error instanceof Error){      
          toast.error(`Error creating trip : ${error.message}`);
        }
      else{
          toast.error(`Creating trip failed due to unknown error`);
      } 
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, acceptRide };
};
