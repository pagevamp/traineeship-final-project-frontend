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
import { dummyRides } from '@public/docs/dummyRides';
import Image from 'next/image';
import { Suspense } from 'react';
import { Pagination } from '@components/common/PaginationComponent';
import { SearchComponent } from '@components/common/SearchComponent';
import { ViewContentComponent } from '../../common/ViewContentComponent';
import { Icon } from '@iconify/react';

export const RideTable = () => {
  const itemsPerPage = 5;
  const { query, currentPage, useFilterRides,toggleContentVisibility,viewContentOpen } = useHistory();
  const rideData = useFilterRides(query, currentPage, dummyRides);

  return (
    <div>
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <h2 className="font-bold text-2xl text-text-one-100">
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
                  key={header}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rideData.map((data, idx) => (
              <TableRow key={data.id}>
                {/* S.N */}
                <TableCell>{idx + 1}</TableCell>

                {/* Ride ID */}
                <TableCell>{data.id}</TableCell>

                {/* Passenger */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.passenger.profileImage}
                      alt="passenger"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-black"
                    />
                    <span className="font-medium">
                      {data.passenger.firstName} {data.passenger.lastName}
                    </span>
                  </div>
                </TableCell>

                {/* Pickup */}
                <TableCell>{data.pickupLocation}</TableCell>

                {/* Destination */}
                <TableCell>{data.destination}</TableCell>

                {/* Departure Time */}
                <TableCell>
                  <div className="inline-flex items-center gap-1">
                    <Icon icon="eos-icons:hourglass" width={16} height={16} className='cursor-pointer' onClick={toggleContentVisibility}/>
                    <span className="truncate">                    {data.departureTime.departureStart}
                    {' ➙ '}
                    {data.departureTime.departureEnd}
                    </span>
                  </div>
                  {viewContentOpen &&  
                    <ViewContentComponent content= {
                      <div className='flex flex-col gap-2'>
                        <p>FROM : {data.departureTime.departureStart}</p>
                        <p>TO : {data.departureTime.departureEnd}</p>
                      </div>}>
                    </ViewContentComponent>
                  }
                  
                </TableCell>

                {/* Accepted At */}
                <TableCell>
                  {data.acceptedAt ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400">
                      {data.acceptedAt}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400">
                      Pending
                    </span>
                  )}
                </TableCell>

                {/* Deleted At */}
                <TableCell className="text-center">
                  {data.deletedAt ? (
                    <span className="bg-red-500/15 text-red-400 text-xs font-semibold rounded-full px-3 py-1">
                      {data.deletedAt}
                    </span>
                  ) : (
                    <span className=" bg-amber-200/15 text-amber-600 text-xs font-semibold rounded-full px-3 py-1">
                      N/A
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
           <TableCaption className="mt-4">
                      <Pagination totalPages={Math.ceil(dummyRides.length / itemsPerPage)} />
                    </TableCaption>
        </Table>
      </Suspense>
    </div>
  );
};
