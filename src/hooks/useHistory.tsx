import { Ride, RideSearchTypes, Trip, TripSearchTypes } from '@/core/types/history-types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export function useHistory() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';
  const currentPage = Number(searchParams?.get('page')) || 1;

  const pathname = usePathname();
  const { replace } = useRouter();

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

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

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
        (data: RideSearchTypes) =>
          data.passenger?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          data.passenger?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          data.pickupLocation?.toLowerCase().includes(lowerCaseQuery) ||
          data.destination?.toLowerCase().includes(lowerCaseQuery),
      );

      return queriedData.slice(start, start + itemsPerPage);
    }, [currentPage, historyData, lowerCaseQuery]);
    return ridesData;
  }

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
        (data: TripSearchTypes) =>
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
  };
}
