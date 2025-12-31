import { TripCard } from '@/components/Trip/TripCard'
import { TripHeader } from '@/components/Trip/TripHeader';

export const TripComponent = () => {
  return (
    <div className='flex flex-col'>
      <TripHeader/>
      <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-2" />
      <TripCard/>
    </div>
  )
}
