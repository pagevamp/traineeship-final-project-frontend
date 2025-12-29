'use client';
import Image from 'next/image';
import { Button } from '@components/common/Button';
import { Icon } from '@iconify/react';
import { formatDistanceToNow, max } from 'date-fns';
import { Ride } from '@/core/types/Ride';
import { formatTime } from '@/lib/utils';

interface RideRequestCardProps {
  ride: Ride;
  onAccept: (id: string) => void;
  onClick: () => void;
}

export const RideRequestCard = ({ ride, onAccept, onClick }: RideRequestCardProps) => {
  return (
    <div className="relative flex flex-col border-2 border-secondary-100 rounded-xl w-full md:w-2/3 lg:w-2/4 p-4 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% hover:scale-101 transition-all duration-300">
      <div className="absolute top-0 right-0 z-10 px-4 py-1 rounded-bl-xl rounded-tr-lg text-xs uppercase font-bold tracking-wider bg-secondary-100 text-light-text-100">
        {formatDistanceToNow(new Date(ride.createdAt), { addSuffix: true })}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-12 h-12 rounded-lg border-secondary-100/20 border-2 overflow-hidden">
          <Image
            src={ride.passenger!.profileImage}
            alt={ride.passenger!.firstName}
            className="object-cover"
            width={45}
            height={45}
          />
        </div>
        <div>
          <h3 className="font-semibold md:text-lg text-secondary-100">
            {ride.passenger!.firstName} {ride.passenger!.lastName}
          </h3>
          <div className="flex gap-1 items-center">
            <Icon icon="mdi:phone" className="size-3" />
            <p className="text-xs md:text-sm text-light-text-100">{ride.passenger!.phoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-[15%] space-y-2 mb-1">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-tertiary-100">
              <Icon icon="ic:sharp-wheelchair-pickup"></Icon>
            </span>
            <span className="text-xs md:text-sm uppercase text-tertiary-100 font-bold">Pickup</span>
          </div>
          <span className="text-xs md:text-sm truncate text-light-text-100 ml-1">
            - {ride.pickupLocation} ({ride.landmark})
          </span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-tertiary-100">
              <Icon icon="mdi:location-check"></Icon>
            </span>
            <span className="text-xs uppercase md:text-sm text-tertiary-100 font-bold">
              Destination
            </span>
          </div>
          <span className="text-xs md:text-sm truncate text-light-text-100 ml-1">
            - {ride.destination}
          </span>
        </div>
      </div>
      <div className="flex justify-start items-center gap-3 mb-2">
        <div className="flex items-center gap-1">
          <span className="text-tertiary-100">
            <Icon icon="mdi:clock-outline"></Icon>
          </span>
          <span className="text-xs uppercase md:text-sm text-tertiary-100 font-bold">
            Departure Time
          </span>
        </div>

        <div className="flex text-xs md:text:sm text-light-text-100">
          <span>{formatTime(ride.departureTime.departureStart)}</span>
          <span>&nbsp; {'-'}&nbsp;</span>
          <span>{formatTime(ride.departureTime.departureEnd)}</span>
        </div>
      </div>
      <div className="flex gap-2 md:gap-5">
        <Button
          className="h-9 px-4 bg-secondary-100 text-light-text-100 hover:scale-102 hover:opacity-90"
          onClick={(e) => {
            e.stopPropagation();
            onAccept(ride.id);
          }}
        >
          <span className=" text-light-text-100">
            <Icon icon="fluent-mdl2:accept"></Icon>
          </span>
          Accept Ride
        </Button>
        <Button
          className="group h-9 px-4 bg-outline-100 border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100/10"
          onClick={onClick}
        >
          Details
          <span className="w-0 h-4 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-1 text-light-text-100">
            <Icon icon="formkit:arrowright"></Icon>
          </span>
        </Button>
      </div>
    </div>
  );
};
