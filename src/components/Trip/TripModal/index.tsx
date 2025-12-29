import { Modal } from '@/components/common/Modal';
import { Trip } from '@/core/types/trip-types';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export const TripModal = ({
  data,
  onClose,
}: {
  data: Trip;
  onClose: () => void;
}) => {

const tripsInfoRow = [
  {
    icon : "mdi:calendar-clock",
    label :"Created",
    value : new Date(data.createdAt).toLocaleString()
  },
  {
    icon : "mdi:map-marker",
    label :"Pickup",
    value : data.ride.pickupLocation
  },
  {
    icon : "mdi:map-marker-radius",
    label :"Destination",
    value : data.ride.destination
  },
  {
    icon : "mdi:map-search",
    label :"Landmark",
    value : data.ride.landmark
  }
]

  return (
    <article
      title="Trip Details"
    >
      <div className="flex flex-col gap-6 rounded-2xl bg-card-bg-100 p-5 md:p-6">

        {/* Passenger Section */}
        <div className="flex items-center gap-4 rounded-xl border border-tertiary-100/20 bg-secondary-100/5 p-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-secondary-100/30">
            <Image
              src={data.passenger.imageUrl}
              alt="Passenger"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs uppercase font-semibold text-tertiary-100">
              Passenger
            </p>
            <h2 className="text-sm md:text-base font-semibold text-light-text-100">
              {data.passenger.firstName} {data.passenger.lastName}
            </h2>
          </div>
        </div>

        {/* Trip Info */}
        <div className="flex flex-col gap-4 rounded-xl border border-secondary-100/20 p-4">
          {tripsInfoRow.map((trip)=>(
            <div className="flex items-start gap-3" key={trip.label}>
                <Icon
                  icon={trip.icon}
                  className="text-tertiary-100 mt-0.5"
                  width={18}
                  height={18}
                />
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-semibold text-tertiary-100">
                    {trip.label}
                  </span>
                  <span className="text-sm text-light-text-100 font-medium wrap-break-word">
                    {trip.value}
                  </span>
                </div>
              </div>
          ))}
        </div>
      </div>
    </article>
  );
};

