'use client';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
     window.location.href = '/';
    }
  }, [isSignedIn]);

  if (!isSignedIn) return null;

  return <>{children}</>;
}
