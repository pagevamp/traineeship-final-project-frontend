'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

export const SideBar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/directory', icon: 'bxs:food-menu', label: 'Directory' },
    { href: '/rides', icon: 'mdi:bike-fast', label: 'View Rides' },
    { href: '/trips', icon: 'mdi:account-pending', label: 'View Pending Trips' },
    { href: '/about-us', icon: 'ix:about', label: 'About Us' },
  ];

  return (
    <div className="absolute bottom-10 h-[80vh] w-[35vh] mx-8 rounded-lg bg-card-bg-100 shadow-lg shadow-gray-900 flex flex-col justify-between text-text-two-100 px-4 py-6">
      {/* Top Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-text-one-100/80 font-semibold text-xl text-center border-b border-tertiary-100/20 w-full pb-2 mb-4">
          Features
        </h2>

        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group w-full flex items-center gap-4 rounded-md py-3 px-4 transition-all duration-200
                ${
                  isActive
                    ? 'bg-tertiary-100/30 text-text-one-100/80 scale-98'
                    : 'text-tertiary-100 hover:rounded-md hover:bg-tertiary-100/30 hover:text-text-one-100/80 hover:scale-98'
                }
              `}
            >
              <Icon icon={item.icon} width={24} height={24} className='text-shadow-2xs'/>
              <span className="text-md font-medium">{item.label}</span>
            </Link>
          );
        })}
      </section>

      <section className="h-40 w-[85%] bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 shadow-md shadow-gray-900  mx-auto my-5 rounded-md flex flex-col gap-3 items-center justify-center text-tertiary-100 text-sm border-black">
      <div className='flex flex-row gap-2 items-center text-text-one-100/80'><Icon icon='mdi:robot-happy' width={24} height={24}/><span>58 Happy Outsiders</span></div>
      <p className='font-semibold text-md'>@Outside Shares</p>
      </section>
    </div>
  );
};
