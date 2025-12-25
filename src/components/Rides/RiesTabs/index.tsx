'use client';

import { RideTab } from '@/app/(protected)/rides/page';
import { Button } from '@/components/common/Button';
import { Icon } from '@iconify/react';

interface Props {
  activeTab: RideTab;
  onChange: (tab: RideTab) => void;
}

export const RidesTabs = ({ activeTab, onChange }: Props) => (
  <div className="flex gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 w-fit shadow-2xl">
    <Button
      onClick={() => onChange('all')}
      className={`flex border-none items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
        activeTab === 'all'
          ? 'bg-secondary-100 text-text-one-100 shadow-[0_0_20px_rgba(var(--secondary-rgb),0.3)]'
          : 'text-gray-400 hover:text-text-one-100 hover:bg-white/5'
      }`}
    >
      <Icon icon="mdi:car-multiple" className="size-5" />
      Available Rides
    </Button>

    <Button
      onClick={() => onChange('mine')}
      className={`flex items-center border-none gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
        activeTab === 'mine'
          ? 'bg-secondary-100 text-text-one-100'
          : 'text-gray-400 hover:text-text-one-100 hover:bg-white/5'
      }`}
    >
      <Icon icon="mdi:account-circle" className="size-5" />
      My Requests
    </Button>
  </div>
);
