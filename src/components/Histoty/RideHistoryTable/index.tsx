'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { rideTableableHeaders } from '@/core/types/history-types';
import { useHistory } from '@/hooks/useHistory';
import Image from 'next/image';
import { Suspense } from 'react';
import { Pagination } from '@components/common/PaginationComponent';
import { SearchComponent } from '@components/common/SearchComponent';
import { ViewContentComponent } from '../../common/ViewContentComponent';
import { format } from 'date-fns';
import { Ride } from '@/core/types/Ride';
import { getMyRides } from '@/core/api/ride.api';
import useSWR from 'swr';
import { TableSkeleton } from '@/components/common/TableSkeleton';
import { BufferComponent } from '@/components/common/BufferComponent';


export const RideTable = () => {
  const itemsPerPage = 5;
  const { query, currentPage, useFilterRides,viewContentOpen } = useHistory();
   const {
    data: ridesData ,
    error,
    isLoading,
  } = useSWR<Ride[]>('trips/', getMyRides);
  const rideData = useFilterRides(query, currentPage, ridesData ?? []);

  if (isLoading){
   return <div><TableSkeleton rows={5} columns={5} message={'Ride'}/></div>
  }

  if (error){
    return <BufferComponent message={`Error loading your ride history : ${error.message}`} icon={'line-md:coffee-half-empty-twotone-loop'}/>;
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <h2 className="font-bold text-2xl text-text-one-100/70">
          Your Ride History with <span className="text-secondary-100 font-extrabold">MILERA</span>
        </h2>
        <SearchComponent/>
      </section>
      <Suspense key={query + currentPage}>
        <Table>
          <TableHeader>
            <TableRow>
              {rideTableableHeaders.map((header) => (
                <TableHead
                  key={header.title}
                  className={header.className}
                >
                  {header.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rideData.map((data, idx) => (
              <TableRow key={data.id}>
                {/* S.N */}
                <TableCell className='text-text-two-100'>{idx + 1}</TableCell>

                {/* Passenger */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.passenger?.profileImage ?? '/unknown_proile.png'}
                      alt="passenger"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-secondary-100/40"
                    />
                    <span className="font-medium">
                      {data.passenger?.firstName} {data.passenger?.lastName}
                    </span>
                  </div>
                </TableCell>

                {/* Pickup */}
                <TableCell>{data.pickupLocation}</TableCell>

                {/* Destination */}
                <TableCell>{data.destination}</TableCell>

                {/* Departure Time */}
                <TableCell className="hidden lg:table-cell">
                  <span>
  {data.departureTime?.departureStart 
    ? format(new Date(data.departureTime.departureStart), 'EEE, MMM dd, yyyy') 
    : 'N/A'}
  {' → '}
  {data.departureTime?.departureEnd 
    ? format(new Date(data.departureTime.departureEnd), 'EEE, MMM dd, yyyy') 
    : 'N/A'}
</span>
                  {viewContentOpen && (
                    <ViewContentComponent content={
                      <div className="flex flex-col gap-1 mt-1 text-light-text-100 text-sm">
                        <p>From: {data.departureTime.departureStart}</p>
                        <p>To: {data.departureTime.departureEnd}</p>
                      </div>
                    } />
                  )}
                </TableCell>

                {/* Accepted At */}
                <TableCell className="hidden lg:table-cell">
                  {data.acceptedAt ? (
                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-800">
                      {format(data.acceptedAt,'EEE, MMM dd, yyyy')}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-yellow-500/10 text-yellow-800">
                      Pending
                    </span>
                  )}
                </TableCell>

                {/* Deleted At */}
                <TableCell className="hidden lg:table-cell">
                  {data.deletedAt ? (
                    <span className="bg-red-500/10 text-red-800 text-xs font-semibold rounded-md px-3 py-1">
                      {format(data.deletedAt,'EEE, MMM dd, yyyy')}
                    </span>
                  ) : (
                    <span className="bg-amber-200/10 text-amber-800 text-xs font-semibold rounded-md px-3 py-1">
                      N/A
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
            <TableCaption className="mt-4">
              <Pagination totalPages={Math.ceil((ridesData?.length ?? 0) / itemsPerPage)} />
            </TableCaption>
        </Table>
      </Suspense>
    </div>
  );
};
