'use client';
import { Ride } from '@/core/types/Ride';
import { Modal } from '@/components/common/Modal';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { RideRequestForm } from '../../RideRequestForm';
import { CancelConfirmationDialog } from '../../CancelDialog';
import { useModal, ViewMode } from '@/hooks/useViewModal';
import { useMyRideRequests } from '@/hooks/useMyRideRequest';
import { BufferComponent } from '@/components/common/BufferComponent';

export const MyRideRequestsSection = () => {
  const { open, close, isFormOpen, isCancelling } = useModal();

  const {
    onConfirmCancel,
    ridesData,
    isLoading,
    ridesError,
    tripsData,
    selectedRide,
    setSelectedRide,
  } = useMyRideRequests();


  if (isLoading) {
    return <BufferComponent message={'Please wait while we fetch the available rides. This might take a few seconds.'} icon={'eos-icons:hourglass'}/>;
  }

  if (ridesData.length === 0 && tripsData.length === 0) {
    return <BufferComponent message={'You have not requested any rides'} icon={'line-md:coffee-half-empty-twotone-loop'}/>;
  }

  if (ridesError) {
    return <BufferComponent message={`Error loading your rides : ${ridesError.message}`} icon={'line-md:alert-twotone'}/>;
  }

  const handleAction = (mode: ViewMode, ride: Ride | null) => {
    setSelectedRide(ride);
    open(mode);
  };

  return (
    <div className="p-6 rounded-2xl">
      <div className="flex flex-col gap-6 justify-center items-center">
        {tripsData.map((trip) => (
          <MyRideRequestCard
            key={trip.id}
            trip={trip}
            onCancel={() => handleAction('cancelling', trip.ride)}
          />
        ))}

        {ridesData
          .filter((ride) => !tripsData.some((trip) => trip.ride.id === ride.id))
          .map((ride) => (
            <MyRideRequestCard
              key={ride.id}
              ride={ride}
              onCancel={() => handleAction('cancelling', ride)}
            />
          ))}

        {ridesData.length === 0 && tripsData.length === 0 && (
          <div className="text-center p-10">No ride requests found.</div>
        )}
      </div>

      <Modal title={'Request a new ride'} open={isFormOpen} onOpenChange={close}>
        <RideRequestForm ride={selectedRide} onClose={close} />
      </Modal>

      <Modal title="Trip Cancellation" open={isCancelling} onOpenChange={close}>
        <CancelConfirmationDialog onConfirm={onConfirmCancel} onClose={close} />
      </Modal>
    </div>
  );
};
