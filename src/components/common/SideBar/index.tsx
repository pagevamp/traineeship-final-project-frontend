'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import { Button } from '../Button';
import Link from 'next/link';

export const SideBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="h-screen w-full place-content-center flex flex-col items-center justify-items-stretch text-undraw-secondary-100 px-8">
      <div className="flex flex-row gap-3 items-center absolute top-5 left-5">
        {isSignedIn ? (
          <SignOutButton redirectUrl="/sign-in">
            <Button>Log Out</Button>
          </SignOutButton>
        ) : (
          <Link href={'/sign-in'}>
            <Button>SigIn</Button>
          </Link>
        )}
      </div>
      <span className="font-extrabold text-5xl text-shadow-sm text-shadow-text-two-100">
        Welcome to{' '}
        <span className="whitespace-pre-wrap text-5xl text-text-two-100 font-extrabold text-shadow-card-bg-100">
          Outside Ride Sharing
        </span>
      </span>
    </div>
  );
};
