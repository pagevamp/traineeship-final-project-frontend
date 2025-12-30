export type TripStatus = 'not_started' | 'on_the_way' | 'reached_pickup' | 'reached_destination';
export type vehicleType = 'two_wheeler' | 'four_wheeler';

export const tripTableableHeaders = [
  {title : 'S.N', className : ''},
  {title : 'Driver', className : 'hidden lg:table-cell'},
  {title : 'Passenger', className : ''},
  {title : 'Destination', className : ''},
  {title : 'Pick-Up Location', className : ''},
  {title : 'Departure Time', className : 'hidden lg:table-cell'},
  {title : 'Accepted At', className : 'hidden lg:table-cell'},
  {title : 'Cancelled At', className : 'hidden lg:table-cell'},

];

export const rideTableableHeaders = [
  {title : 'S.N', className : ''},
  {title : 'Passenger', className : ''},
  {title : 'Destination', className : ''},
  {title : 'Pick-Up Location', className : ''},
  {title : 'Departure Time', className : 'hidden lg:table-cell'},
  {title : 'Accepted At', className : 'hidden lg:table-cell'},
  {title : 'Cancelled At', className : 'hidden lg:table-cell'},
];

export type HistoryTab = 'Rides' | 'Trips';

export interface RideSearchTypes {
  passenger: {
    firstName: string | null;
    lastName: string | null;
  };
  pickupLocation: string | null;
  destination: string | null;
}

export interface TripSearchTypes {
  driver: {
    firstName: string | null;
    lastName: string | null;
  };
  passenger: {
    firstName: string | null;
    lastName: string | null;
  };
  ride: {
    pickupLocation: string | null;
    destination: string | null;
  };
}
