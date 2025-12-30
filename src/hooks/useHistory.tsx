"use client"
import { Trip } from '@/core/schema/trip.schema';
import { RideSearchTypes, TripSearchTypes } from '@/core/types/history-types';
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
    historyData: RideHistory,
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const ridesData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = historyData.filter(
        (data) =>
          data.passenger?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          data.passenger?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          data.pickupLocation?.toLowerCase().includes(lowerCaseQuery) ||
          data.destination?.toLowerCase().includes(lowerCaseQuery),
      );

      return queriedData.slice(start, start + itemsPerPage);
    }, [currentPage, historyData, lowerCaseQuery]);
    return ridesData;
  }

  //to get the query and page params from the url and provide search and pagination for the Trips table
  function useFilterTrips<TripHistory extends Trip[]>(
    query: string,
    currentPage: number,
    historyData: TripHistory,
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const tripsData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = historyData.filter(
        (data) =>
          data.driver?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          data.driver?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          data.passenger?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          data.passenger?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          data.ride?.pickupLocation?.toLowerCase().includes(lowerCaseQuery) ||
          data.ride?.destination?.toLowerCase().includes(lowerCaseQuery),
      );

      return queriedData.slice(start, start + itemsPerPage);
    }, [currentPage, historyData, lowerCaseQuery]);
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
