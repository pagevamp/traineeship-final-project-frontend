'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/components/common/Button';
import { formatTime } from '@/lib/utils';
import { Ride } from '../../../../types/Ride';

interface ViewDetailsProps {
  ride: Ride;
  onAccept: (id: string) => void;
  isOwnRide: boolean;
  onCancel?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const ViewDetails = ({ isOwnRide, ride, onEdit, onAccept, onCancel }: ViewDetailsProps) => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-2xl border-secondary-100/20 border-2 overflow-hidden">
            <Image
              src={ride.passenger.profileImage}
              alt={ride.passenger.firstName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-secondary-100 leading-tight">
              {ride.passenger.firstName} {ride.passenger.lastName}
            </h3>
            <p className="text-sm text-light-text-100 flex items-center gap-1">
              <Icon icon="mdi:phone" />
              {ride.passenger.phoneNumber}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm uppercase font-bold text-tertiary-100 block">
            Departure Time
          </span>
          <div className="text-sm font-semibold text-light-text-100">
            {formatTime(ride.departureTime.start)}
            {' - '} {formatTime(ride.departureTime.end)}
          </div>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="flex flex-col gap-8 relative">
          <div className="absolute left-2.75 top-3 bottom-10 w-0.5 bg-dashed border-l-2 border-dashed border-tertiary-100/30" />

          <div className="flex gap-4 relative z-10">
            <div className="p-1 rounded-full shadow-sm">
              <Icon icon="ic:sharp-wheelchair-pickup" className="size-6 text-tertiary-100" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-lg uppercase font-bold text-tertiary-100 tracking-wider">
                Pickup Location
              </span>
              <span className="text-md font-medium text-light-text-100">{ride.pickupLocation}</span>
              <span className="text-sm text-light-text-100">Landmark: {ride.landmark}</span>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className=" rounded-full shadow-sm">
              <Icon icon="mdi:location-check" className="size-6 text-secondary-100" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-lg uppercase font-bold text-tertiary-100 tracking-wider">
                Destination
              </span>
              <span className="text-md font-medium text-light-text-100 wrap-break-words">
                {ride.destination}
              </span>
            </div>
          </div>
        </div>
      </div>

      {ride.notes && (
        <div className="mx-6 mb-6 p-4 bg-light-bg-100 rounded-lg border-secondary-100 border-2">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="mdi:note-text-outline" className="size-4 text-secondary-100" />
            <span className="text-lg uppercase font-bold text-tertiary-100">Passenger Notes</span>
          </div>
          <p className="text-sm text-tertiary-100 leading-relaxed">{ride.notes}</p>
        </div>
      )}

      {isOwnRide ? (
        <div className="flex justify-between">
          {!ride.acceptedAt && (
            <Button
              className="px-4 bg-secondary-100 text-light-text-100 hover:opacity-90 hover:scale-102"
              onClick={() => onEdit?.(ride.id)}
            >
              <Icon icon="mdi:pencil-outline" className="mr-1" /> Edit
            </Button>
          )}

          <Button
            className="h-9 px-4 bg-red-600 border-none text-light-text-100  hover:opacity-90  hover:scale-102"
            onClick={(e) => {
              e.stopPropagation();
              onCancel?.(ride.id);
            }}
          >
            cancel
          </Button>
        </div>
      ) : (
        <Button
          className="ml-6 bg-secondary-100  hover:scale-102 text-light-text-100 hover:opacity-90"
          onClick={(e) => {
            e.stopPropagation();
            onAccept(ride.id);
          }}
        >
          Accept
        </Button>
      )}
    </div>
  );
};
