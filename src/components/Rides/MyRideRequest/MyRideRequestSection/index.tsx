'use client';
import { Ride } from '@/core/types/Ride';
import { Modal } from '@/components/common/Modal';
import { ViewDetails } from '../../ViewDetails';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { RideRequestForm } from '../../RideRequestForm';
import { CancelConfirmationDialog } from '../../CancelDialog';
import { useState } from 'react';
import { useModal, ViewMode } from '@/hooks/useViewModal';
import useSWR from 'swr';
import { getMyPendingRides } from '@/core/api/ride.api';

export const MyRideRequestsSection = () => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const { open, close, isFormOpen, isViewing, isCancelling } = useModal();
  const {
    data: ridesData = [],
    error,
    isLoading,
  } = useSWR<Ride[]>('ride-requests/me/pending', getMyPendingRides);

  if (isLoading) {
    return <div className="p-6">Loading rides...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load rides</div>;
  }

  if (ridesData.length === 0) {
    return <div className="p-6">No rides</div>;
  }

  const handleAction = (mode: ViewMode, ride: Ride | null) => {
    setSelectedRide(ride);
    open(mode);
  };

  return (
    <div className="p-6 rounded-2xl">
      <div className="flex flex-col gap-6 justify-center items-center">
        {ridesData.map((ride) => (
          <MyRideRequestCard
            key={ride.id}
            ride={ride}
            onEdit={() => handleAction('editing', ride)}
            onCancel={() => handleAction('cancelling', ride)}
            onViewDetails={() => handleAction('viewing', ride)}
          />
        ))}
      </div>

      <Modal
        title={selectedRide ? 'Edit your ride request' : 'Request a new ride'}
        open={isFormOpen}
        onOpenChange={close}
      >
        <RideRequestForm ride={selectedRide} onClose={close} />
      </Modal>

      <Modal title="Ride Cancellation" open={isCancelling} onOpenChange={close}>
        <CancelConfirmationDialog
          onConfirm={() => {
            console.log('Cancelling ID:', selectedRide?.id);
            close();
          }}
          onClose={close}
        />
      </Modal>

      {/* {selectedRide && (
        <Modal title="Ride Request Details" open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <ViewDetails
            ride={selectedRide}
            isOwnRide={true}
            onEdit={() => {
              setIsDetailsOpen(false);
              handleEditRide(selectedRide);
            }}
            onCancel={() => handleCancelRide}
            onAccept={() => {}}
          />
        </Modal>
      )} */}

      <Modal title="Ride Request Details" open={isViewing} onOpenChange={close}>
        {selectedRide && (
          <ViewDetails
            ride={selectedRide}
            isOwnRide={true}
            onEdit={() => open('editing')}
            onCancel={() => open('cancelling')}
            onAccept={() => {}}
          />
        )}
      </Modal>
    </div>
  );
};
