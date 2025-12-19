import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

export default async function OnBoardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata?.onboardingComplete === true) {
    redirect('/rides');
  }
  return <>{children}</>;
}
