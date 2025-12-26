'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Ride } from '@/core/types/Ride';

interface TripCardProps {
  ride: Ride;
  onCancel: (id: string) => void;
  onAccept: (id: string, type: 'two-wheeler' | 'four-wheeler') => void;
}

export const TripCard = ({ ride, onCancel, onAccept }: TripCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const isAccepted = !!ride.acceptedAt;

  return (
    <>
      <div
        className={`flex flex-col border-2 rounded-xl w-[50vh] md:w-2/3 lg:w-2/4 p-5 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% hover:scale-101 transition-all duration-300 relative overflow-hidden
      `}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-secondary-100/20">
            <Image src={ride.passenger.profileImage} alt="Passenger" fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-text-one-100">Trip Request</h3>
            <p className="text-xs text-light-text-100 flex items-center gap-1">
              <Icon icon="mdi:calendar-check" /> Created{' '}
              {formatDistanceToNow(new Date(ride.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-secondary-100" />
            <div className="w-0.5 h-14 border-l-2 border-dashed border-secondary-100/30" />
            <div className="w-3 h-3 rounded-full border-2 border-tertiary-100" />
          </div>
          <div className="flex flex-col justify-between py-0.5 gap-3">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm uppercase font-bold text-tertiary-100 leading-none">Pickup</span>
              <span className="text-xs md:text-sm truncate text-light-text-100 font-medium">{ride.pickupLocation}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm uppercase font-bold text-tertiary-100 leading-none">Destination</span>
              <span className="text-sm text-light-text-100 font-medium truncate">{ride.destination}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-auto gap-3">
          {/* Accept Button with Popover */}
          {!isAccepted && (
            <div className="relative">
              <Button
                className="h-9 px-4 bg-green-600 text-white hover:opacity-90 hover:scale-102 transition-transform"
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                Accept
              </Button>

              {popoverOpen && (
                <div className="absolute left-0 top-full mt-2 w-40 bg-card-bg-100 border border-secondary-100 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                    onClick={() => {
                      onAccept(ride.id, 'two-wheeler');
                      setPopoverOpen(false);
                    }}
                  >
                    Two-Wheeler
                  </button>
                  <button
                    className="w-full px-4 py-2 text-light-text-100 hover:bg-secondary-100/20 text-left"
                    onClick={() => {
                      onAccept(ride.id, 'four-wheeler');
                      setPopoverOpen(false);
                    }}
                  >
                    Four-Wheeler
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Details Button */}
          <Button
            className="h-9 px-4 bg-outline-100 border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100/10"
            onClick={() => setDetailsOpen(true)}
          >
            Details
          </Button>

          {/* Cancel Button */}
          {!isAccepted && (
            <Button
              className="h-9 px-4 bg-red-600 text-light-text-100 hover:opacity-90 hover:scale-102 transition-transform"
              onClick={() => onCancel(ride.id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Modal for Details */}
      <Modal title="Trip Details" open={detailsOpen} onOpenChange={setDetailsOpen}>
        <div className="flex flex-col gap-2">
          <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
          <p><strong>Destination:</strong> {ride.destination}</p>
          <p><strong>Passenger:</strong> {ride.passenger.firstName} {ride.passenger.lastName}</p>
          <p><strong>Created:</strong> {new Date(ride.createdAt).toLocaleString()}</p>
          {/* Add more details as needed */}
        </div>
      </Modal>
    </>
  );
};
