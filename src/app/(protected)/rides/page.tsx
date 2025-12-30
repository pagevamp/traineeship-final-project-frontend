'use client';

import { RidesBackground } from '@/components/Rides/RidesBackground';
import { RidesHeader } from '@/components/Rides/RidesHeader';
import { RidesTabs } from '@/components/Rides/RidesTabs';
import { Button } from '@/components/common/Button';

import { RideRequestsSection } from '@/components/Rides/RideRequest/RideRequestsSection';
import { MyRideRequestsSection } from '@components/Rides/MyRideRequest/MyRideRequestSection/index';
import { useMyRideRequests } from '@/hooks/useMyRideRequest';
import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { RideRequestForm } from '@/components/Rides/RideRequestForm';

const Rides = () => {
  const { activeTab, setActiveTab } = useMyRideRequests();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <RidesBackground />
      <div className="relative z-10 md:p-8 lg:p-12">
        <div className="max-w-7xl p-4 mx-auto mb-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <RidesHeader />
            <div className="absolute top-3 right-3 md:top-5 md:right-5 flex justify-end">
              <Button
                className="px-2 py-1 md:px-6 md:py-3 hover:scale-103 hover:bg-secondary-100/10 text-light-text-100"
                onClick={() => setIsPostModalOpen(true)}
              >
                Request ride
              </Button>
            </div>
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

          <Modal
            title="Create a new ride request"
            open={isPostModalOpen}
            onOpenChange={setIsPostModalOpen}
          >
            <RideRequestForm onClose={() => setIsPostModalOpen(false)} />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default Rides;
