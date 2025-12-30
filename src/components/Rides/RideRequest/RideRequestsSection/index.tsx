'use client';
import { Modal } from '@/components/common/Modal';
import { RideRequestCard } from '@/components/Rides/RideRequest/RideRequestCard';
import { ViewDetails } from '../../ViewDetails';

import { useAvailableRides } from '@/hooks/useAvailableRides';

export const RideRequestsSection = () => {
  const {
    close,
    handleSelectRide,
    handleAcceptRide,
    ridesData,
    isLoading,
    error,
    isViewing,
    selectedRide,
  } = useAvailableRides();

  if (isLoading) {
    return <div className="p-6">Loading rides...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load rides</div>;
  }

  if (ridesData.length === 0) {
    return <div className="p-6">No rides</div>;
  }

  return (
    <div className=" p-6 rounded-2xl">
      <div className="flex flex-col gap-6 justify-center items-center ">
        {ridesData.map((ride) => (
          <RideRequestCard
            key={ride.id}
            ride={ride}
            onAccept={() => handleAcceptRide(ride.id)}
            onClick={() => handleSelectRide(ride)}
          />
        ))}
      </div>

      {selectedRide && (
        <Modal title="Ride Request Details" open={isViewing} onOpenChange={close}>
          {selectedRide && (
            <ViewDetails
              ride={selectedRide}
              isOwnRide={false}
              onAccept={() => handleAcceptRide(selectedRide.id)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
