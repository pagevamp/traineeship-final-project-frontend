import { TripCard } from '@/components/Trip/TripCard'
import { TripHeader } from '@/components/Trip/TripHeader';

export const TripComponent = () => {
  return (
    <div className='flex flex-col'>
      <TripHeader/>
      <TripCard/>
    </div>
  )
}
