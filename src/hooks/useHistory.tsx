"use client"
import { Trip } from '@/core/schema/trip.schema';
import { Ride } from '@/core/types/Ride';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useHistory() {

  const [viewContentOpen, setViewContentOpen] = useState<boolean>(false);
  
    const toggleContentVisibility = () => {
      setViewContentOpen(!viewContentOpen);
    };

  //for adding and reading the url parameters  
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const currentPage = Number(searchParams?.get('page')) || 1;

  const pathname = usePathname();
  const { replace } = useRouter();

  //To add search query for content in the Rides/Trips table
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    const addQuery = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 1500);

    return () => {
      clearTimeout(addQuery);
    };
  }

  //To add page query params for pagination in the Rides/Trips table
  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  //to get the query and page params from the url and provide search and pagination for the Ride table
  function useFilterRides<RideHistory extends Ride[]>(
    query: string,
    currentPage: number,
    RideHistoryData: RideHistory,
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const ridesData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = RideHistoryData.filter(
        (rideData) =>
          rideData.passenger?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          rideData.passenger?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          rideData.pickupLocation.toLowerCase().includes(lowerCaseQuery) ||
          rideData.destination.toLowerCase().includes(lowerCaseQuery),
      );

      return queriedData.slice(start, start + itemsPerPage);
    }, [RideHistoryData, currentPage, lowerCaseQuery]);
    return ridesData;
  }

  //to get the query and page params from the url and provide search and pagination for the Trips table
  function useFilterTrips<TripHistory extends Trip[]>(
    query: string,
    currentPage: number,
    tripsHistoryData: TripHistory,
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const tripsData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = tripsHistoryData.filter(
        (tripData) =>
          tripData.driver?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          tripData.driver?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          tripData.passenger?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          tripData.passenger?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          tripData.ride.pickupLocation?.toLowerCase().includes(lowerCaseQuery) ||
          tripData.ride.destination?.toLowerCase().includes(lowerCaseQuery),
      );

      return queriedData.slice(start, start + itemsPerPage);
    }, [currentPage, lowerCaseQuery, tripsHistoryData]);
    return tripsData;
  }
  return {
    query,
    currentPage,
    searchParams,
    pathname,
    handleSearch,
    handlePagination,
    useFilterRides,
    useFilterTrips,
    viewContentOpen,
    toggleContentVisibility
  };
}
