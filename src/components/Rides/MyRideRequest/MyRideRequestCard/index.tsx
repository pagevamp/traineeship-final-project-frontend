'use client';
import { Icon } from '@iconify/react';
import { Ride } from '@/core/types/Ride';
import { Button } from '../../../common/Button';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface MyRideRequestCardProps {
  ride: Ride;
  onEdit: () => void;
  onCancel: (id: string) => void;
  onViewDetails: () => void;
}

export const MyRideRequestCard = ({
  ride,
  onEdit,
  onCancel,
  onViewDetails,
}: MyRideRequestCardProps) => {
  const isAccepted = !!ride.acceptedAt;

  return (
    <div
      className={`flex flex-col border-2 rounded-xl w-full md:w-2/3 lg:w-2/4 p-5 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% hover:scale-101 transition-all duration-300 relative overflow-hidden
      ${isAccepted ? 'border-green-500/70 ' : 'border-secondary-100'}
    `}
    >
      <div
        className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs md:text-sm uppercase tracking-wider 
        ${isAccepted ? 'bg-green-500/70 text-white' : 'bg-secondary-100 text-light-text-100'}`}
      >
        {isAccepted ? 'Accepted' : 'Awaiting Driver'}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-secondary-100/20">
          <Image src={ride.passenger!.profileImage} alt="You" fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-text-one-100">Your Trip Request</h3>
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
            <span className="text-xs md:text-sm uppercase font-bold text-tertiary-100 leading-none">
              Pickup
            </span>
            <span className="text-xs md:text-sm truncate text-light-text-100 font-medium">
              {ride.pickupLocation}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm uppercase font-bold text-tertiary-100 leading-none">
              Destination
            </span>
            <span className="text-sm text-light-text-100 font-medium truncate">
              {ride.destination}
            </span>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-between gap-3 mt-auto">
        <div className="flex gap-2 md:gap-5">
          {!isAccepted && (
            <Button
              className="h-9 px-4 bg-secondary-100 text-light-text-100 hover:opacity-90 hover:scale-102 transition-transform"
              onClick={onEdit}
            >
              <Icon icon="mdi:pencil-outline" className="mr-1" /> Edit
            </Button>
          )}
          <Button
            className="group h-9 px-4 bg-outline-100 border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100/10"
            onClick={onViewDetails}
          >
            Details
            <span className="w-0 h-4 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-1 text-light-text-100">
              <Icon icon="formkit:arrowright">+</Icon>
            </span>
          </Button>
        </div>

        {!isAccepted && (
          <Button
            className="h-9 px-4 bg-red-600 border-none text-light-text-100  hover:opacity-90  hover:scale-102"
            onClick={() => {
              onCancel(ride.id);
            }}
          >
            cancel
          </Button>
        )}
      </div>
    </div>
  );
};
