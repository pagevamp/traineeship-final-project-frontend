'use client';

import { NavBar } from '@/components/common/NavBar';
import { Protect, RedirectToSignIn } from '@clerk/nextjs';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="flex flex-col">
        <header className="w-full">
          <NavBar />
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center md:p-6 overflow-auto">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </Protect>
  );
}
