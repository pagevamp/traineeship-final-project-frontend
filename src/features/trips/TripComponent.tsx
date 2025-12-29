import { TripCard } from '@/components/Trip/TripCard'
import { TripHeader } from '@/components/Trip/TripHeader';
import { TripStatus } from '@/core/types/trip-types';

export const TripComponent = () => {

    const handleCancel = (id: string) => {
    console.log('Cancel Trip:', id);
  };

  const handleStatusUpdate = (id: string, type: TripStatus) => {
    console.log('Update Trip Status:', id, 'as', type);
  };
  return (
    <div className='flex flex-col'>
        <TripHeader/>
    
    <TripCard
            onCancel={handleCancel}
            onStatusUpdate={handleStatusUpdate}
    />
    </div>
  )
}
