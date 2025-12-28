'use client';

import { useState } from 'react';
import { z } from 'zod';
import {
  Ride,
  UpdateRideActionState,
  UpdateRideRequest,
  UpdateRideSchema,
} from '@/core/types/Ride';
import { useSWRConfig } from 'swr';
import { updateRide } from '@/core/api/ride.api';
import { toast } from 'sonner';

export const useEditRideRequest = (ride: Ride) => {
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = useState({
    pickupLocation: ride?.pickupLocation ?? '',
    destination: ride?.destination ?? '',
    landmark: ride?.landmark ?? '',
    notes: ride?.notes ?? '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UpdateRideActionState['errors']>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const result = UpdateRideSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        pickupLocation: fieldErrors.properties?.pickupLocation?.errors[0],
        destination: fieldErrors.properties?.destination?.errors[0],
        landmark: fieldErrors.properties?.landmark?.errors[0],
        notes: fieldErrors.properties?.notes?.errors[0],
      });

      return false;
    }

    setError({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (!isValid) return;
    try {
      setLoading(true);
      const payload: UpdateRideRequest = {
        destination: formData.destination,
        pickupLocation: formData.pickupLocation,
        landmark: formData.landmark || null,
        notes: formData.notes || null,
      };
      toast.promise(updateRide(ride.id, payload), {
        loading: 'Saving changes...',
        success: () => {
          mutate('ride-requests/me/pending');
          onClose();
          return 'Ride updated successfully!';
        },
        error: (err) => {
          const message = err?.response?.data?.message || err.message || 'Something went wrong';
          setError((prev) => ({ ...prev, server: message }));
          return message;
        },
      });
      mutate('ride-requests/me/pending');
    } catch (err) {
      if (err instanceof Error) {
        setError((prev) => ({ ...prev, server: err.message }));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    handleSubmit,
  };
};
