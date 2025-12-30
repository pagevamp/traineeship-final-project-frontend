'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export const NavBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between w-full h-20 px-6 bg-primary-100 border-b border-secondary-100/30">
      <div className="flex items-center gap-3">
        <Link href="/rides" className="text-text-one-100 text-2xl font-bold text ml-20">
          MILERA
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoaded && (
          <>
            {isSignedIn && (
              <div className="text-right">
                <p className="text-placeholder-100 text-xs md:text-sm">Hi,</p>
                <p className="text-text-one-100 text-xs md:text-lg font-semibold">
                  {user.fullName}
                </p>
              </div>
            )}
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="History"
                  href="/history"
                  labelIcon={<Icon icon="nimbus:history" className="w-full"></Icon>}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        )}
      </div>
    </nav>
  );
};
