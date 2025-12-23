'use client';

import { Protect, RedirectToSignIn } from '@clerk/nextjs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <Protect fallback={<RedirectToSignIn />}>{children}</Protect>;
}
