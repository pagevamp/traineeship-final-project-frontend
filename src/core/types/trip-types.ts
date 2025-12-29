
export type vehicleType = 'two_wheeler' | 'four_wheeler';

export enum TripStatus{
  NOT_STARTED = 'not_started',
  ON_THE_WAY = 'on_the_way',
  REACHED_DESTINATION = 'reached_destination',
  REACHED_PICKUP = 'reached_pickup',
}

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
    lastName: string
    imageUrl: string
  }
}

export interface TripCardProps {
  data: Trip;
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

export interface AcceptRideProps {
  acceptedAt : string|null; id: string;
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

