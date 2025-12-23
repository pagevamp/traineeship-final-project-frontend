"use client";

import { NavBar } from "@/components/common/NavBar";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protect fallback={<RedirectToSignIn />}>
      <NavBar />
      {children}
    </Protect>
  );
}
