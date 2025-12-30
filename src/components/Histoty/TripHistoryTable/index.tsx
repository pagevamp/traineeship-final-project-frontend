import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tripTableableHeaders } from '@/core/types/history-types';
import { useHistory } from '@/hooks/useHistory';
import Image from 'next/image';
import { Suspense } from 'react';
import { SearchComponent } from '@/components/common/SearchComponent';
import { Pagination } from '@/components/common/PaginationComponent';
import { ViewContentComponent } from '../../common/ViewContentComponent';
import { format } from 'date-fns';
import useSWR from 'swr';
import { Trip } from '@/core/schema/trip.schema';
import { getTrips } from '@/core/api/trip.api';

export const TripTable = () => {
  const itemsPerPage = 5;
  const { query, currentPage, useFilterTrips, viewContentOpen } = useHistory();
   const {
    data: tripsData ,
    error,
    isLoading,
  } = useSWR<Trip[]>('trips/me', getTrips);
const tripData = useFilterTrips(query, currentPage, tripsData ?? []);

  if (isLoading){
   return <div>Looking for your trips data</div>
  }

  if (error){
   return (error.message)
  }

  return (
    <div className="">
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <h2 className="font-bold text-2xl text-text-one-100/70">
          Your Trip History with <span className="text-secondary-100 font-extrabold">MILERA</span>
        </h2>
        <SearchComponent/>
      </section>

      <Suspense key={query + currentPage}>
        <Table >
          <TableHeader>
            <TableRow>
              {tripTableableHeaders.map((header) => (
                <TableHead key={header.title} className={header.className}>
                  {header.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tripData.map((data, idx) => (
              <TableRow key={data.id}>
                {/* S.N */}
                <TableCell className="text-text-two-100">{idx + 1}</TableCell>

                {/* Driver */}
                <TableCell className='hidden lg:table-cell'>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.driver?.profileImage ?? '/unknown_profile.png'}
                      alt="driver"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-secondary-100/40"
                    />
                    {data.driver?.firstName} {data.driver?.lastName}
                  </div>
                </TableCell>

                {/* Passenger */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.ride.passenger?.profileImage ?? '/unknown_profile.png'}
                      alt="passenger"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-secondary-100/40"
                    />
                    <span className="text-text-one-100 font-medium">{data.ride.passenger?.firstName} {data.ride.passenger?.lastName}</span>
                  </div>
                </TableCell>

                {/* Pickup Location */}
                <TableCell >{data.ride?.pickupLocation}</TableCell>

                {/* Destination */}
                <TableCell >{data.ride?.destination}</TableCell>

                {/* Departure Time */}
                <TableCell className="hidden lg:table-cell">
                  <span>
                    {data.ride?.departureTime?.departureStart 
                      ? format(new Date(data.ride?.departureTime?.departureStart), 'EEE, MMM dd, yyyy') 
                      : 'N/A'}
                    {' → '}
                    {data.ride?.departureTime?.departureEnd 
                      ? format(new Date(data.ride?.departureTime?.departureEnd), 'EEE, MMM dd, yyyy') 
                      : 'N/A'}
                  </span>
                  {viewContentOpen && (
                    <ViewContentComponent content={
                      <div className="flex flex-col gap-1 mt-1 text-sm">
                        <p>From: {data.ride?.departureTime?.departureStart}</p>
                        <p>To: {data.ride?.departureTime?.departureEnd}</p>
                      </div>
                    } />
                  )}
                </TableCell>

                {/* Accepted At */}
                <TableCell className="text-center hidden lg:table-cell">
                  {data.createdAt ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-800 text-sm font-medium">
                      {format(new Date(data.createdAt), 'EEE, MMM dd, yyyy')}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-light-bg-100/15 text-secondary-100 text-sm font-medium">
                      N/A
                    </span>
                  )}
                </TableCell>

                {/* Cancelled At */}
                <TableCell className="text-center hidden lg:table-cell">
                  {data.deletedAt ? (
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-800 text-sm font-medium">
                      {format(new Date(data.deletedAt), 'EEE, MMM dd, yyyy')}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-200/10 text-amber-800  text-sm font-medium">
                      N/A
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption className="mt-4">
            <Pagination totalPages={Math.ceil((tripsData?.length ?? 0) / itemsPerPage)} />
          </TableCaption>
        </Table>
      </Suspense>
    </div>
  );
};
