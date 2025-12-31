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
  } = useSWR<Ride[]>('ride-requests/me', getMyRides);
  const rideData = useFilterRides(query, currentPage, ridesData ?? []);

  if (isLoading){
   return <div><TableSkeleton rows={rideData.length <=5 ? rideData.length + 1 : 5} columns={rideTableableHeaders.length} message={'Ride'}/></div>
  }

  if (error){
    return <BufferComponent message={`Error loading your ride history : ${error.message}`} icon={'line-md:alert-twotone'}/>;
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3 over">
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

                {/* Driver */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.driver?.profileImage ?? '/unknown_proile.png'}
                      alt="driver"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-secondary-100/40"
                    />
                    <span className="font-medium">
                      {data.driver?.firstName} {data.driver?.lastName}
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

                 {/* Created At */}
                <TableCell className="hidden lg:table-cell">
                    <span className="px-3 py-1 rounded-md text-xs font-semibold">
                      {format(data.createdAt,'EEE, MMM dd, yyyy')}
                    </span>
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

                {/* Cancelled Status */}
                <TableCell className="hidden lg:table-cell">
                  {data.driver !== null && data.acceptedAt === null ?  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-red-500/10 text-red-800">
                        Cancelled By Driver
                    </span> : data.driver === null && data.acceptedAt === null ? <span className="px-3 py-1 rounded-md text-xs font-semibold bg-yellow-500/10 text-yellow-800">
                        Pending
                    </span> :<span className="px-3 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-800">
                        Accepted
                    </span>
                  }
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
