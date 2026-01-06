'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/onboarding/_actions';
import { InputField } from '@/components/common/InputField';
import { Button } from '@/components/common/Button';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const { error, formData, handleChange,handleValidation, loading } = useUpdateProfile();
  

  const handleSubmit = async (rawFormData: FormData) => {
    const isValid = handleValidation();

    if (!isValid) return;

    const res = await completeOnboarding(rawFormData);

    if (!handleValidation()) return;
    if (res?.message) {
      await user?.reload();
      router.push('/rides');
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary-100 text-text-one-100 px-4">
      <section className="w-full max-w-xl bg-card-bg-100 rounded-2xl p-10 shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="mb-3 text-display-1 line-height-display-1--line-height font-display-1--font-weight">
            Welcome to{' '}
            <span className="text-shadow-md text-shadow-secondary-100"> OutSide Ride Share</span>
          </h1>
          <p className="text-placeholder-100 text-display-2 line-height-display-2--line-height font-display-2--font-weight">
            Let&apos;s get you set up before you continue
          </p>
        </header>

        <form action={handleSubmit} className="space-y-6">
          <InputField
            type="text"
            name="primaryLocation"
            labelName="Primary Location"
            value={formData.primaryLocation}
            placeholder="Enter your primary location"
            icon="material-symbols:location-away-outline"
            error={error?.primaryLocation}
            onChange={handleChange}
          />

          <InputField
            type="text"
            name="contactNumber"
            labelName="Contact Number"
            value={formData.contactNumber}
            placeholder="+977 _ _ _ _ _ _ _ _ _"
            icon="bxs:contact"
            error={error?.contactNumber}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full h-fit mt-4 rounded-lg font-semibold
              bg-secondary-100
              text-white
              hover:opacity-90
              transition-all cursor-pointer hover:bg-tertiary-100"
          >
            {loading ? 'Getting you on board ' : 'Complete Onboarding'}
          </Button>
        </form>
      </section>
    </main>
  );
}
