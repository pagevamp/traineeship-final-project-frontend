'use client';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import { UpdateStatus } from '../UpdateStatusComponent';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import { TripModal } from '../TripModal';
import useSWR, { mutate } from 'swr';
import { deleteTrip, getMyPendingTrips } from '@/core/api/trip.api';
import { Trip } from '@/core/schema/trip.schema';
import { useModal, ViewMode } from '@/hooks/useViewModal';
import { toast } from 'sonner';
import { Modal } from '@/components/common/Modal';
import { CancelConfirmationDialog } from '@/components/Rides/CancelDialog';
import { useUpdateTrip } from '@/hooks/useUpdateTrip';
import { TripStatus } from '@/core/types/trip-types';


export const TripCard = () => {  
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { open, close, isCancelling } = useModal();
  const { updateStatus } = useUpdateTrip();

 const {
    data: tripsData,
    error,
    isLoading,
  } = useSWR<Trip[]>('trips/me/pending', getMyPendingTrips);

  const onConfirmCancel = async () => {
    if (!selectedTrip) return;

    try {
      toast.promise(deleteTrip(selectedTrip.id), {
        loading: 'Cancelling the trip you accepted...',
        success: () => {
          mutate('trips/me/pending');
          close();
          return 'Accepted Trip cancelled.';
        },
        error: (err) => err?.response?.data?.message || 'Failed to cancel trip',
      });
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  
  if (isLoading) {
    return <div className="p-6">Loading trips...</div>;
  }

  if (error) {
    console.log(error.message)
    return <div className="p-6 text-red-500">Failed to load trips</div>;
  }

  if (!tripsData) {
    return <div className="p-6">No trips pending</div>;
  }

  if (!tripsData.length) {
    return <div className="p-6">No trips pending</div>;
  }
  
    const handleAction = (mode: ViewMode, trip: Trip | null) => {
      setSelectedTrip(trip);
      open(mode);
    };

    const now = new Date()
    const expired = new Date(tripsData?.[0]?.ride?.departureTime.departureEnd)

  return (
    <article className='flex flex-col items-center gap-5'>
      <div 
        className='flex flex-col border border-secondary-100/60 rounded-xl w-[25vw] md:w-[35vw] lg:w-[50vw] p-5 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% relative'
      >
       
        <div className="flex items-center mb-6 justify-between">
          <section className='flex flex-row gap-4 place-content-start'>
            {/* <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-secondary-100/20">
              <Image src={tripsData?.[0].passenger.profileImage} alt="Passenger" fill className="object-cover" />
            </div> */}
            <div>
              <h3 className="font-bold text-lg text-text-one-100">Trip Request</h3>
              <p className="text-xs text-light-text-100 flex items-center gap-1">
                <Icon icon="mdi:calendar-check" /> Trip Accepted{' '}
                {tripsData?.[0]?.createdAt ? formatDistanceToNow(new Date(tripsData?.[0]?.createdAt)) : formatDistanceToNow(new Date(0))} ago
              </p>
            </div>
          </section>

           {/* Details Button */}
           <Button
            className="h-10 px-6 bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% border-2 border-secondary-100 text-light-text-100 hover:bg-secondary-100/10"
            onClick={() => setDetailsOpen(true)}
          >
            Details
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-secondary-100" />
            <div className="w-0.5 h-14 border-l-2 border-dashed border-secondary-100/30" />
            <div className="w-3 h-3 rounded-full border-2 border-tertiary-100" />
          </div>
          <div className="flex flex-col justify-between py-0.5 gap-5">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm uppercase font-semibold text-tertiary-100 leading-none">Pickup</span>
              <span className="text-xs md:text-sm truncate text-light-text-100 font-medium">{tripsData?.[0]?.ride?.pickupLocation}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm uppercase font-semibold text-tertiary-100 leading-none">Destination</span>
              <span className="text-sm text-light-text-100 font-medium truncate">{tripsData?.[0]?.ride?.destination}</span>
            </div>
          </div>
        </div>
        
        {expired > now &&
          <UpdateStatus trip={tripsData?.[0]}  onCancel={() => handleAction('cancelling', tripsData?.[0])}   
                        onStatusUpdate={(tripId, status) => updateStatus(tripId, status as TripStatus)}/>
        }
        <Modal title="Trip Cancellation" open={isCancelling} onOpenChange={close}>
              <CancelConfirmationDialog onConfirm={onConfirmCancel} onClose={close} />
        </Modal>

         <p className="text-xs text-normal flex items-center gap-1 place-content-center mt-2">
                <Icon icon="fluent:channel-alert-28-regular" /> Trip expires {" "}
                                {tripsData?.[0]?.ride?.departureTime.departureEnd ? formatDistanceToNow(new Date(tripsData?.[0]?.createdAt)) : formatDistanceToNow(new Date(0))} ago
         </p>
      </div>
      {detailsOpen && <TripModal data={tripsData} onClose={() => setDetailsOpen(false)} open={detailsOpen}/>}
    </article>
  );
};


