'use client';
import { Icon } from '@iconify/react';
import { Ride } from '@/core/types/Ride';
import { Trip } from '@/core/types/Trip';
import { Button } from '../../../common/Button';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { formatTime } from '@/lib/utils';

interface MyRideRequestCardProps {
  ride?: Ride;
  trip?: Trip;
  onCancel?: (id: string) => void;
}

export const MyRideRequestCard = ({ ride, trip, onCancel }: MyRideRequestCardProps) => {
  const data = trip ? trip.ride : ride;
  const isAccepted = !!trip;
  const driver = trip?.driver;

  if (!data) return null;

  return (
    <div
      className={`flex flex-col border-2 rounded-xl w-full md:w-2/3 lg:w-2/4 p-5 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% transition-all duration-300 relative overflow-hidden
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
        <div>
          <h3 className="font-bold text-lg text-text-one-100">
            {isAccepted ? 'Active Trip' : 'Your Trip Request'}
          </h3>
          <p className="text-xs text-light-text-100 flex items-center gap-1">
            <Icon icon="mdi:calendar-check" /> Created{' '}
            {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
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
            <span className="text-xs uppercase font-bold text-tertiary-100 leading-none">
              Pickup
            </span>
            <span className="text-sm truncate text-light-text-100 font-medium">
              {data.pickupLocation}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-tertiary-100 leading-none">
              Destination
            </span>
            <span className="text-sm text-light-text-100 font-medium truncate">
              {data.destination}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-tertiary-100">
            <Icon icon="mdi:clock-outline"></Icon>
          </span>
          <span className="text-xs uppercase md:text-sm text-tertiary-100 font-bold">
            Departure Time
          </span>
        </div>

        <div className="flex text-xs md:text:sm text-light-text-100">
          <span>{formatTime(data.departureTime.departureStart)}</span>
          <span>&nbsp; {'-'}&nbsp;</span>
          <span>{formatTime(data.departureTime.departureEnd)}</span>
        </div>
      </div>

      {data.notes && (
        <div className="mb-6 p-3 bg-secondary-100/5 rounded-lg border border-secondary-100/10">
          <p className="text-[10px] uppercase font-bold text-tertiary-100 mb-1 flex items-center gap-1">
            <Icon icon="mdi:note-text-outline" /> Your Notes
          </p>
          <p className="text-xs text-light-text-100 italic">{data.notes}</p>
        </div>
      )}

      {isAccepted && driver && (
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-green-500/5 p-3 rounded-xl border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={driver.profileImage} alt="Driver" fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase font-black text-green-600 tracking-tighter">
                  {driver?.firstName} {driver?.lastName}{' '}
                </p>
                <p className="text-sm text-text-one-100 leading-tight">{driver?.phoneNumber}</p>
              </div>
              <Icon icon="mdi:steering" className="text-green-600 size-6" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-tertiary-100 px-1">
              <span>Current Status</span>
              <span className="text-green-600">{trip.status?.replace('_', ' ') || 'Assigned'}</span>
            </div>

            <div className="flex gap-1.5 h-1.5">
              {['not_started', 'on_the_way', 'reached_pickup', 'reached_destination'].map(
                (step, idx, arr) => {
                  const statusOrder = arr.indexOf(trip.status);
                  const isActive = idx <= statusOrder;
                  return (
                    <div
                      key={step}
                      className={`flex-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-green-500' : 'bg-secondary-100/20'}`}
                    />
                  );
                },
              )}
            </div>

            <p className="text-xs md:text-sm text-light-text-100 italic text-center">
              {trip.status === 'not_started' && 'Driver is has not yet started the ride.'}
              {trip.status === 'on_the_way' && 'Driver is heading to your location'}
              {trip.status === 'reached_pickup' && 'Driver has arrived at pickup point'}
              {trip.status === 'reached_destination' && 'Trip completed successfully'}
            </p>
          </div>
        </section>
      )}

      <div className="flex items-center justify-between gap-3 mt-auto">
        {onCancel && (
          <Button
            className=" p-2 px-4 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/20 transition-all text-xs"
            onClick={() => onCancel(data.id)}
          >
            {' '}
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
