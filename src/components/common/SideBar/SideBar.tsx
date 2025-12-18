'use client';

import { SignOutButton, useAuth } from '@clerk/nextjs';
import { Button } from '../Button';

export const SideBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="border-b-4 h-[15vh] w-full place-content-center flex flex-row items-center justify-items-stretch text-undraw-secondary-100">
      <span className="font-extrabold text-5xl text-shadow-sm text-shadow-card-bg-100">
        Welcome to{' '}
        <span className="whitespace-pre-wrap text-5xl text-text-two-100 font-extrabold ">
          Outside Ride Sharing
        </span>
      </span>
      <div className="flex flex-row gap-3 items-center">
        {isSignedIn ? (
          <SignOutButton redirectUrl="/sign-in">
            <Button>Log Out</Button>
          </SignOutButton>
        ) : (
          <a href={'/sign-in'}>
            <Button>Sign In</Button>
          </a>
        )}
      </div>
    </div>
  );
};
