'use client';
import { Ride } from '@/core/types/Ride';
import { Modal } from '@/components/common/Modal';
import { ViewDetails } from '../../ViewDetails';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { RideRequestForm } from '../../RideRequestForm';
import { CancelConfirmationDialog } from '../../CancelDialog';
import { useState } from 'react';
import { useModal, ViewMode } from '@/hooks/useViewModal';

export const MyRideRequestsSection = () => {
  const ridesData: Ride[] = [
    {
      id: '3ff23a-9f55-472d-b2a9-1e13456e5757',
      passengerId: 'user_37CEl7rk6l3pMjAF4jJUmSA6fkP',
      destination: 'Naikap',
      landmark: 'Outside',
      status: 'not_started',
      pickupLocation: 'Outside',
      notes: 'I have two large suitcases. Please call upon arrival.',
      departureTime: {
        departureStart: '2025-12-24 08:00:00+00',
        departureEnd: '2025-12-24 09:30:00+00',
      },
      acceptedAt: null,
      passenger: {
        firstName: 'Hidden',
        lastName: 'Name',
        profileImage:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zN0NFbDM4R2NrS0lMVjhGTHJwRlUxSHVVaWkifQ',
        phoneNumber: '8828828888',
      },
      createdAt: '2025-12-23T11:47:41.534Z',
    },
  ];

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  const { open, close, isFormOpen, isViewing, isCancelling } = useModal();

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
