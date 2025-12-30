export type TripStatus = 'not_started' | 'on_the_way' | 'reached_pickup' | 'reached_destination';
export type vehicleType = 'two_wheeler' | 'four_wheeler';

export const tripTableableHeaders = [
  'S.N',
  'Driver',
  'Passenger',
  'Pick-Up Location',
  'Destination',
  'Departure Time',
  'Accepted At',
  'Cancelled At',
];

export const rideTableableHeaders = [
  'S.N',
  'Passenger',
  'Pick-Up Location',
  'Destination',
  'Departure Time',
  'Accepted At',
  'Deleted At',
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
