'use client';
import { Button } from '@/components/common/Button';
import { SideBar } from '@/components/common/SideBar';
import { Protect, RedirectToSignIn } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  const toggleSideBarVisibility = () => {
    setSideBarOpen(!sideBarOpen);
  };
  return (
    <Protect fallback={<RedirectToSignIn />}>
      
      <Button
        onClick={toggleSideBarVisibility}
        className="absolute top-22 left-3 z-10 backdrop-blur-lg hover:bg-secondary-100/80 rounded-full border-2 border-tertiary-100/20 h-10 max-w-5"
      >
        <Icon icon="mingcute:menu-fill" width={32} height={32}/>
      </Button>

      {sideBarOpen === true && <SideBar />}
      {children}
    </Protect>
  );
}
