'use client';

import { useState } from 'react';
import { z } from 'zod';

import { toast } from 'sonner';
import { completeOnboarding } from '@/app/onboarding/_actions';
import { UpdateProfileActionState, UpdateProfileSchema } from '../core/types/user-profile-types';
import { useUser } from '@clerk/nextjs';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UpdateProfileActionState['errors']>({});
  const { user } = useUser();

  const [formData, setFormData] = useState(() => ({
    contactNumber: (user?.publicMetadata?.contactNumber as string) || '',
    primaryLocation: (user?.publicMetadata?.primaryLocation as string) || '',
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!handleValidation()) return;
    const fd = new FormData();
    fd.append('contactNumber', formData.contactNumber);
    fd.append('primaryLocation', formData.primaryLocation);

    toast.promise(completeOnboarding(fd), {
      loading: 'Updating profile...',
      success: () => {
        return 'Profile updated successfully!';
      },
      error: (err) => {
        const msg = err?.response?.data?.message || 'Update failed';
        setError((prev) => ({ ...prev, server: msg }));
        return msg;
      },
    });
  };

  const handleValidation = () => {
    const result = UpdateProfileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        contactNumber: fieldErrors.properties?.contactNumber?.errors[0],
        primaryLocation: fieldErrors.properties?.primaryLocation?.errors[0],
      });

      return false;
    }

    setError({});
    return true;
  };

  return {
    error,
    formData,
    handleChange,
    loading,
    setLoading,
    handleSubmit,
  };
};
