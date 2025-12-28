export type TripStatus = 'not_started' | 'on_the_way' | 'reached_pickup' | 'reached_destination';
export type vehicleType = 'two_wheeler' | 'four_wheeler';

export interface Trip {
  id: string,
  driverId: string,
  status: string,
  vehicleType: string,
  createdAt: string,
  updatedAt: string | null,
  deletedAt: string | null,
  ride: {
      id: string,
      passengerId: string,
      destination: string,
      landmark: string,
      pickupLocation: string,
      notes: string,
      departureTime: {
        start: string,
        end: string,
      },
      acceptedAt: string|null,
      createdAt: string,
      updatedAt: string | null,
      deletedAt: string | null
    },
  driver: {
    firstName: string,
    lastName: string,
    profileImage: string,
    phoneNumber: string,
    primaryLocation:string,
  },
  passenger: {
    firstName: string,
    lastName: string,
    imageUrl: string
  }
}

export const tripTableableHeaders = ['Driver','Passenger','Ride ID','Pick-Up Location','Destination','Departure Time','Accepted At']
 

export interface Ride {
  id: string,
      passengerId: string,
      destination: string,
      landmark: string,
      pickupLocation: string,
      notes: string,
      departureTime: {
        start: string,
        end: string,
      },
       acceptedAt: string|null,
      createdAt: string,
      updatedAt: string | null,
      deletedAt: string | null
  passenger: {
    firstName: string,
    lastName: string
    imageUrl: string
    phoneNumber: string
  }
}

export const rideTableableHeaders = ['Ride ID','Passenger','Pick-Up Location','Destination','Departure Time','Accepted At']

export type HistoryTab = "Rides" | "Trips"
  
