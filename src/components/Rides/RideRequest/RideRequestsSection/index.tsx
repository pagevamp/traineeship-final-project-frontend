'use client';
import { Modal } from '@/components/common/Modal';
import { RideRequestCard } from '@/components/Rides/RideRequest/RideRequestCard';
import { ViewDetails } from '../../ViewDetails';

import { useAvailableRides } from '@/hooks/useAvailableRides';
import { BufferComponent } from '@/components/common/BufferComponent';

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
    return (
      <BufferComponent
        message={'Please wait while we fetch the available rides. This might take a few seconds.'}
        icon={'eos-icons:hourglass'}
      />
    );
  }

  if (ridesData.length === 0) {
    return (
      <BufferComponent
        message={'Take a break. You do not have any available rides'}
        icon={'line-md:coffee-half-empty-twotone-loop'}
      />
    );
  }

  if (error) {
    return (
      <BufferComponent
        message={`Error loading your rides : ${error.message}`}
        icon={'line-md:alert-twotone'}
      />
    );
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
