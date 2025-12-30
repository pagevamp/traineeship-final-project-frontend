'use client';
import { Ride } from '@/core/types/Ride';
import { Modal } from '@/components/common/Modal';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { RideRequestForm } from '../../RideRequestForm';
import { CancelConfirmationDialog } from '../../CancelDialog';
import { useModal, ViewMode } from '@/hooks/useViewModal';
import { useMyRideRequests } from '@/hooks/useMyRideRequest';

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

  if (isLoading) return <div className="p-6">Loading...</div>;

  if (ridesData.length === 0 && tripsData.length === 0) {
    return <div className="p-6">No rides found.</div>;
  }

  if (ridesError) {
    return <div className="p-6 text-red-500">Failed to load rides</div>;
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

      <Modal title="Ride Cancellation" open={isCancelling} onOpenChange={close}>
        <CancelConfirmationDialog onConfirm={onConfirmCancel} onClose={close} />
      </Modal>
    </div>
  );
};
