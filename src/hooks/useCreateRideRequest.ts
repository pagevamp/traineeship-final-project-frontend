'use client';

import { useState } from 'react';
import { z } from 'zod';
import {
  CreateRideActionState,
  CreateRideRequest,
  CreateRideSchema,
  Ride,
} from '@/core/types/Ride';
import { useSWRConfig } from 'swr';
import { createRide } from '@/core/api/ride.api';
import { toast } from 'sonner';

export const useCreateRideRequest = (ride?: Ride | null) => {
  const { mutate } = useSWRConfig();

  const [formData, setFormData] = useState({
    pickupLocation: ride?.pickupLocation ?? '',
    destination: ride?.destination ?? '',
    landmark: ride?.landmark ?? '',
    notes: ride?.notes ?? '',
    departureStart: ride?.departureTime.departureStart
      ? new Date(ride.departureTime.departureStart)
      : null,
    departureEnd: ride?.departureTime.departureEnd
      ? new Date(ride.departureTime.departureEnd)
      : null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CreateRideActionState['errors']>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setDepartureStart = (date: Date | null) =>
    setFormData((prev) => ({ ...prev, departureStart: date }));

  const setDepartureEnd = (date: Date | null) =>
    setFormData((prev) => ({ ...prev, departureEnd: date }));

  const handleValidation = () => {
    const result = CreateRideSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        pickupLocation: fieldErrors.properties?.pickupLocation?.errors[0],
        destination: fieldErrors.properties?.destination?.errors[0],
        landmark: fieldErrors.properties?.landmark?.errors[0],
        notes: fieldErrors.properties?.notes?.errors[0],
        departureStart: fieldErrors.properties?.departureStart?.errors[0],
        departureEnd: fieldErrors.properties?.departureEnd?.errors[0],
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
      const payload: CreateRideRequest = {
        destination: formData.destination,
        pickupLocation: formData.pickupLocation,
        landmark: formData.landmark || null,
        notes: formData.notes || null,
        departureStart: formData.departureStart!.toISOString(),
        departureEnd: formData.departureEnd!.toISOString(),
      };
      toast.promise(createRide(payload), {
        loading: ride ? 'Saving changes...' : 'Posting your ride request...',
        success: () => {
          mutate('ride-requests/me/pending');
          onClose();
          return ride ? 'Ride updated successfully!' : 'Ride requested successfully!';
        },
        error: (err) => {
          const message = err?.response?.data?.message || err.message || 'Something went wrong';
          setError((prev) => ({ ...prev, server: message }));
          return message;
        },
      });
      mutate('ride-requests/me/pending');
      console.log('Ride created');
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
    setDepartureStart,
    setDepartureEnd,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    handleSubmit,
  };
};
