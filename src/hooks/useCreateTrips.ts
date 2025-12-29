'use client';

import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import { Trip } from '@/core/schema/trip.schema';
import { updateTrip } from '@/core/api/trip.api';

export const useCreatetRIPS = (trip?: Trip | null) => {
  const { mutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: HTMLButtonElement, onClose: () => void) => {


    try {
      setLoading(true);

      if (trip) {
        toast.promise(updateTrip(trip.id , trip), {
          loading: 'Saving changes...',
          success: (res) => {
            mutate('trips/:id');
            onClose();
            return res.status;
          },
          error: (err) => {
            const msg = err?.response?.data?.message || 'Update failed';
            return msg;
          },
        });
      } 
    } catch (err) {
      console.error('Submission Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,

    handleSubmit,
  };
};
