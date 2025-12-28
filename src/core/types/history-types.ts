export type TripStatus = 'not_started' | 'on_the_way' | 'reached_pickup' | 'reached_destination';
export type vehicleType = 'two_wheeler' | 'four_wheeler';

export interface Trip {
  id: string;
  driverId: string;
  status: string;
  vehicleType: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  ride: {
    id: string;
    passengerId: string;
    destination: string;
    landmark: string;
    pickupLocation: string;
    notes: string;
    departureTime: {
      departureStart: string;
      departureEnd: string;
    };
    acceptedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
  };
  driver: {
    firstName: string;
    lastName: string;
    profileImage: string;
    phoneNumber: string;
    primaryLocation: string;
  };
  passenger: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
}

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

export interface Ride {
  id: string;
  passengerId: string;
  destination: string;
  landmark: string;
  pickupLocation: string;
  notes: string;
  departureTime: {
    departureStart: string;
    departureEnd: string;
  };
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  passenger: {
    firstName: string;
    lastName: string;
    profileImage: string;
    phoneNumber: string;
  };
}

export const rideTableableHeaders = [
  'S.N',
  'Ride ID',
  'Passenger',
  'Pick-Up Location',
  'Destination',
  'Departure Time',
  'Accepted At',
  'Deleted At',
];

export type HistoryTab = 'Rides' | 'Trips';

export interface RideSearchTypes {
  passenger?: {
    firstName?: string;
    lastName?: string;
  };
  pickupLocation?: string;
  destination?: string;
}

export interface TripSearchTypes {
  driver?: {
    firstName?: string;
    lastName?: string;
  };
  passenger?: {
    firstName?: string;
    lastName?: string;
  };
  ride?: {
    pickupLocation?: string;
    destination?: string;
  }
}