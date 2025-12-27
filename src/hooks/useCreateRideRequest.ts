'use client';

import { useState } from 'react';
import { z } from 'zod';
import { createRideRequestSchema, CreateRideRequestActionState } from '@/core/schemas/ride.schema';
import { Ride } from '@/core/types/Ride';

export const useCreateRideRequest = (ride?: Ride | null) => {
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
  const [error, setError] = useState<CreateRideRequestActionState['errors']>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setDepartureStart = (date: Date | null) =>
    setFormData((prev) => ({ ...prev, departureStart: date }));

  const setDepartureEnd = (date: Date | null) =>
    setFormData((prev) => ({ ...prev, departureEnd: date }));

  const handleValidation = () => {
    const result = createRideRequestSchema.safeParse(formData);

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
      console.log(formData);
    } catch (err) {
      if (err instanceof Error) {
      } else {
      }
    } finally {
      onClose();
      setLoading(false);
      setError({});
    }
  };

  return {
    formData,
    setFormData,
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
