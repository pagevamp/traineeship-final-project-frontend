'use client';
import { Ride } from '@/core/types/Ride';
import { Modal } from '@/components/common/Modal';
import { MyRideRequestCard } from '../MyRideRequestCard';
import { RideRequestForm } from '../../RideRequestForm';
import { CancelConfirmationDialog } from '../../CancelDialog';
import { useState } from 'react';
import { useModal, ViewMode } from '@/hooks/useViewModal';
import useSWR, { mutate } from 'swr';
import { deleteRide, getMyPendingRides } from '@/core/api/ride.api';
import { toast } from 'sonner';
import { getAcceptedTrips } from '@/core/api/trip.api';
import { Trip } from '@/core/types/Trip';

export const MyRideRequestsSection = () => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const { open, close, isFormOpen, isCancelling } = useModal();

  const isAccepted = true;

  const {
    data: tripsData = [],
    error: tripsDataError,
    isLoading: tripsLoading,
  } = useSWR<Trip[]>(isAccepted ? 'trips/accepted' : null, getAcceptedTrips);

  const {
    data: ridesData = [],
    error: ridesDataError,
    isLoading: ridesLoading,
  } = useSWR<Ride[]>(isAccepted ? null : 'ride-requests/me/pending', getMyPendingRides);

  const onConfirmCancel = async () => {
    if (!selectedRide) return;

    try {
      toast.promise(deleteRide(selectedRide.id), {
        loading: 'Cancelling your ride request...',
        success: () => {
          mutate('ride-requests/me/pending');
          close();
          return 'Ride request cancelled.';
        },
        error: (err) => err?.response?.data?.message || 'Failed to cancel ride',
      });
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  if (ridesLoading || tripsLoading) return <div className="p-6">Loading...</div>;

  if (ridesDataError || tripsDataError) {
    return <div className="p-6 text-red-500">Failed to load rides</div>;
  }

  if (ridesData.length === 0 && tripsData.length === 0) {
    return <div className="p-6">No rides found.</div>;
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
              onEdit={() => handleAction('editing', ride)}
              onCancel={() => handleAction('cancelling', ride)}
            />
          ))}

        {ridesData.length === 0 && tripsData.length === 0 && (
          <div className="text-center p-10">No ride requests found.</div>
        )}
      </div>

      <Modal
        title={selectedRide ? 'Edit your ride request' : 'Request a new ride'}
        open={isFormOpen}
        onOpenChange={close}
      >
        <RideRequestForm ride={selectedRide} onClose={close} />
      </Modal>

      <Modal title="Ride Cancellation" open={isCancelling} onOpenChange={close}>
        <CancelConfirmationDialog onConfirm={onConfirmCancel} onClose={close} />
      </Modal>
    </div>
  );
};
