'use client';
import { Button } from '@/components/common/Button';
import { SideBar } from '@/components/common/SideBar';

import { NavBar } from '@/components/common/NavBar';
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

      <div className="flex flex-col">
        <header className="w-full">
          <NavBar />
        </header>

      <Button
        onClick={toggleSideBarVisibility}
        size={'icon'}
        className='absolute top-4 left-8 z-10 backdrop-blur-md rounded-[100%] border-3 border-tertiary-100/30 hover:bg-secondary-100/80 cursor-pointer h-12 w-12'
      >
        <Icon icon="mingcute:menu-fill" width={32} height={32} />
      </Button>

        {/* Main Content */}
        <main className="flex items-center justify-center  bg-primary-100 overflow-auto">
          <div className="w-full">{children}</div>
        </main>
      </div>
      
     
      {sideBarOpen === true && <SideBar />}
      
  
      
    </Protect>
  );
}
