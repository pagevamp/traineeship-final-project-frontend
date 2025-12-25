'use client';
import { useState } from 'react';
import { RideRequestsSection } from '@/components/Rides/RideRequestsSection';
import { MyRideRequestsSection } from '@/components/Rides/MyRideRequestSection';
import { RidesBackground } from '@/components/Rides/RidesBackground';
import { RidesHeader } from '@/components/Rides/RidesHeader';
import { RidesTabs } from '@/components/Rides/RiesTabs';
import { Button } from '@/components/common/Button';
import { Icon } from '@iconify/react';

export type RideTab = 'all' | 'mine';

const Rides = () => {
  const [activeTab, setActiveTab] = useState<RideTab>('all');

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <RidesBackground />
      <div className="relative z-10 md:p-8 lg:p-12">
        <div className="max-w-7xl p-4 mx-auto mb-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <RidesHeader />
            <RidesTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        <main className="max-w-7xl mx-auto">
          <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-2" />
          <div className="transition-all duration-700 ease-in-out">
            {activeTab === 'mine' ? (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <MyRideRequestsSection />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <RideRequestsSection />
              </div>
            )}
          </div>
          <div className="fixed bottom-8 right-6 z-50">
            <Button
              className="h-20 w-20 rounded-full bg-secondary-100 shadow-2xl shadow-secondary-100/40 flex items-center justify-center active:scale-90 transition-all border border-white/10"
              aria-label="Create New Request"
            >
              <span className="text-6xl text-light-text-100 flex items-center justify-center">
                <Icon icon="mdi:plus" />
              </span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rides;
