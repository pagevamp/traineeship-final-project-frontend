'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import { TripCardProps } from '@/core/types/trip-types';
import { AcceptButton } from '../AcceptButtonComponent';

export const TripCard = ({ data, onCancel, onAccept }: TripCardProps) => {

  return (
    <article className='flex flex-col items-center gap-5'>
      <div 
        className='flex flex-col border-2 rounded-xl w-[25vw] md:w-[35vw] lg:w-[50vw] p-5 md:p-6 bg-card-bg-100 hover:bg-radial-[at_25%_25%] from-bg-card-bg-100 to-primary-100 to-75% hover:scale-101 transition-all duration-300 relative overflow-hidden'
      >
       
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-secondary-100/20">
            <Image src='/login_page_1.jpeg' alt="Passenger" fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-text-one-100">Trip Request</h3>
            <p className="text-xs text-light-text-100 flex items-center gap-1">
              <Icon icon="mdi:calendar-check" /> Created{' '}
              {formatDistanceToNow(new Date(data.ride.acceptedAt!), { addSuffix: true })}
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
              <span className="text-xs md:text-sm truncate text-light-text-100 font-medium">{data.ride.pickupLocation}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm uppercase font-bold text-tertiary-100 leading-none">Destination</span>
              <span className="text-sm text-light-text-100 font-medium truncate">{data.ride.destination}</span>
            </div>
          </div>
        </div>

        {!data.ride.acceptedAt && <AcceptButton acceptedAt={data.ride.acceptedAt} id={data.id} onCancel={onCancel} onAccept={onAccept}/>}


         {/* Modal for Details */}
        
      
      </div>
    </article>
  );
};


 {/* Details Button */}
          // <Button
          //   className="h-9 px-4 bg-outline-100 border border-secondary-100/30 text-light-text-100 hover:bg-secondary-100/10"
          //   onClick={() => setDetailsOpen(true)}
          // >
          //   Details
          // </Button>