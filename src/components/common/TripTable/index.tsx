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
import { dummyTrips } from '@public/docs/dummyTrips';
import Image from 'next/image';
import { Suspense } from 'react';
import { SearchComponent } from '@components/common/SearchComponent';
import { Pagination } from '@components/common/PaginationComponent';
import { Icon } from '@iconify/react';
import { ViewContentComponent } from '../ViewContentComponent';

export const TripTable = () => {
  const itemsPerPage = 5;
  const { query, currentPage, useFilterTrips,toggleContentVisibility,viewContentOpen } = useHistory();
  const tripData = useFilterTrips(query, currentPage, dummyTrips);

  return (
    <div>
      <section className="flex flex-row items-center justify-between mt-2 mb-5">
        <h2 className="font-semibold text-xl">
          Your Trips History with <span className="text-primary-100 font-extrabold">MILERA...</span>
        </h2>
        <SearchComponent />
      </section>
      <Suspense key={query + currentPage}>
        <Table>
          <TableHeader>
            <TableRow>
              {tripTableableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="text-center text-orange-200 font-semibold text-sm uppercase tracking-wide py-4"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tripData.map((data, idx) => (
              <TableRow key={data.id}>
                {/* S.N */}
                <TableCell>{idx + 1}</TableCell>

                {/* Driver */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.driver.profileImage}
                      alt="driver"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-white/20"
                    />
                    <span className="font-medium">
                      {data.driver.firstName} {data.driver.lastName}
                    </span>
                  </div>
                </TableCell>

                {/* Passenger */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={data.passenger.imageUrl!}
                      alt="passenger"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border border-white/20"
                    />
                    <span className="font-medium">
                      {data.passenger.firstName} {data.passenger.lastName}
                    </span>
                  </div>
                </TableCell>

                {/* Pickup Location*/}
                <TableCell>{data.ride.pickupLocation}</TableCell>

                {/* Destination */}
                <TableCell>{data.ride.destination}</TableCell>

                {/* Departure Time */}
                <TableCell className="hidden lg:table-cell">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium 
                                  bg-primary-200/20 text-primary-200">
                    <Icon icon="eos-icons:hourglass" width={16} height={16} className='cursor-pointer' onClick={toggleContentVisibility}/>
                    <span className="truncate">
                      {data.ride.departureTime.departureStart} → {data.ride.departureTime.departureEnd}
                    </span>
                  </div>
                  {viewContentOpen &&  
                    <ViewContentComponent content= {
                      <div className='flex flex-col gap-2'>
                        <p>FROM : {data.ride.departureTime.departureStart}</p>
                        <p>TO : {data.ride.departureTime.departureEnd}</p>
                      </div>}>
                    </ViewContentComponent>
                  }                
                </TableCell>


                {/* Accepted At */}
                <TableCell>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400">
                    {data.createdAt}
                  </span>
                </TableCell>

                {/* Cancelled At */}
                <TableCell className="text-center">
                  {data.deletedAt ? (
                    <span className="bg-red-500/25 text-red-400 text-xs font-semibold rounded-full px-3 py-1">
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
          <TableCaption>
            <section className="flex flex-col gap-2 items-center">
              <Pagination totalPages={Math.ceil(dummyTrips.length / itemsPerPage)} />
            </section>
          </TableCaption>
        </Table>
      </Suspense>
    </div>
  );
};
