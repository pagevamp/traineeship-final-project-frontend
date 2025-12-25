'use client';

import { NavBar } from '@/components/common/NavBar';
import { Protect, RedirectToSignIn } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="flex flex-col">
        <header className="w-full">
          <NavBar />
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center  bg-primary-100 overflow-auto">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </Protect>
  );
}
