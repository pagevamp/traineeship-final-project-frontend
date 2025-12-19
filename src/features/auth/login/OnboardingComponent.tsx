'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from '@/app/onboarding/_actions';
import { InputField } from '@/components/common/InputField';
import { Button } from '@/components/common/Button';

export default function OnboardingComponent() {
  const [error, setError] = React.useState('');
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);

    if (res?.message) {
      await user?.reload();
      router.push('/rides');
    }

    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary-100 text-text-one-100 px-4">
      <section className="w-full max-w-xl bg-card-bg-100 rounded-2xl p-10 shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="mb-3 text-display-1 line-height-display-1--line-height font-display-1--font-weight">
            Welcome to{' '}
            <span className="text-shadow-md text-shadow-secondary-100">
              {' '}
              OutSide Ride Share
            </span>
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
            placeholder="Enter your primary location"
            icon="mynaui:location-user-solid"
          />

          <InputField
            type="text"
            name="contactNumber"
            labelName="Contact Number"
            placeholder="Enter your contact number"
            icon="bxs:contact"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-fit mt-4 rounded-lg font-semibold
              bg-secondary-100
              text-white
              hover:opacity-90
              transition-all cursor-pointer hover:bg-tertiary-100"
          >
            Complete Onboarding
          </Button>
        </form>
      </section>
    </main>
  );
}
