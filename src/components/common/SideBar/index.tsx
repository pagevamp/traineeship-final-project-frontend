'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { links } from '@/constants';

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="absolute top-32 h-[80vh] w-[35vh] mx-8 rounded-lg bg-card-bg-100 flex flex-col justify-between text-text-two-100 px-4 py-6">
      {/* top section with feature-page links */}
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
              className={`w-full flex items-center gap-4 rounded-md py-3 px-4 transition-all duration-200
                ${
                  isActive
                    ? 'bg-tertiary-100/30 text-text-one-100/80 scale-98'
                    : 'text-tertiary-100 hover:rounded-md hover:bg-tertiary-100/30 hover:text-text-one-100/80 hover:scale-98'
                }
              `}
            >
              <Icon icon={item.icon} width={24} height={24} className="text-shadow-2xs" />
              <span className="text-md font-medium">{item.label}</span>
            </Link>
          );
        })}
      </section>

      {/* Bottom section with project user count */}
      <section className="h-40 w-[85%] bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 shadow-md shadow-gray-900  mx-auto my-5 px-2 py-3 rounded-md flex flex-col gap-3 items-center justify-center text-tertiary-100 text-sm border-black">
        <div className="flex flex-row gap-1 items-center text-text-one-100/80">
          <Icon icon="mdi:robot-happy" width={18} height={18} />
          <span className="text-sm whitespace-nowrap">58 Happy Outsiders</span>
        </div>
        <p className="font-semibold text-md">@Outside Shares</p>
      </section>
    </div>
  );
};
