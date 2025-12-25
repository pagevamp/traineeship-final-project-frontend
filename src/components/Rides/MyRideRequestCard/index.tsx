'use client';
import Image from 'next/image';
import { Button } from '../../common/Button';
import { Icon } from '@iconify/react';
import { Ride } from '../../../../types/Ride';

interface MyRideRequestCardProps {
  ride: Ride;
  onEdit: (id: string) => void;
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
      className={`flex flex-col border-2 rounded-2xl w-full md:w-2/3 lg:w-2/4 p-5 md:p-6 bg-card-bg-100 transition-all duration-300 relative overflow-hidden
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
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-secondary-100/20">
          <Image src={ride.passenger.profileImage} alt="You" fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-text-one-100">Your Trip Request</h3>
          <p className="text-xs text-light-text-100 flex items-center gap-1">
            <Icon icon="mdi:calendar-check" /> Created on {ride.createdAt}
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

      {isAccepted && (
        <section className="space-y-4">
          <div className="flex items-center justify-between bg-green-500/5 p-3 rounded-xl border border-green-500/20">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:steering" className="text-green-600 size-6" />
              <div>
                <p className="text-xs md:text-sm uppercase font-black text-green-600 tracking-tighter">
                  {ride.driver?.phoneNumber}
                </p>
                <p className="text-sm font-bold text-text-one-100 leading-tight">
                  {ride.driver?.firstName} {ride.driver?.lastName}
                </p>
              </div>
            </div>
            <a
              href={`tel:${ride.driver?.phoneNumber}`}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-transform"
            >
              <Icon icon="mdi:phone" />
              Call
            </a>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-tertiary-100 px-1">
              <span>Current Status</span>
              <span className="text-green-600">{ride.status?.replace('_', ' ') || 'Assigned'}</span>
            </div>

            <div className="flex gap-1.5 h-1.5">
              {['not_started', 'on_the_way', 'at_pickup', 'reached'].map((step, idx, arr) => {
                const statusOrder = arr.indexOf(ride.status);
                const isActive = idx <= statusOrder;
                return (
                  <div
                    key={step}
                    className={`flex-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-green-500' : 'bg-secondary-100/20'}`}
                  />
                );
              })}
            </div>

            <p className="text-xs md:text-sm text-light-text-100 italic text-center">
              {ride.status === 'on_the_way' && 'Driver is heading to your location'}
              {ride.status === 'at_pickup' && 'Driver has arrived at pickup point'}
              {ride.status === 'reached' && 'Trip completed successfully'}
              {!ride.status && 'Driver is has not yet started the ride.'}
            </p>
          </div>
        </section>
      )}

      {/* Dynamic Action Buttons */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <div className="flex gap-2 md:gap-5">
          {!isAccepted && (
            <Button
              className="h-9 px-4 bg-secondary-100 text-light-text-100 hover:opacity-90 hover:scale-102 transition-transform"
              onClick={() => onEdit(ride.id)}
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
            onClick={(e) => {
              e.stopPropagation();
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
