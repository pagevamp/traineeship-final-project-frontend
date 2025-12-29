
export enum VehicleType {
  TWO_WHEELER = 'two_wheeler',
  FOUR_WHEELER = 'four_wheeler',
}
export enum TripStatus{
  NOT_STARTED = 'not_started',
  ON_THE_WAY = 'on_the_way',
  REACHED_DESTINATION = 'reached_destination',
  REACHED_PICKUP = 'reached_pickup',
}

export interface Trip {
  id: string,
  driverId: string,
  status: TripStatus,
  vehicleType: VehicleType,
  createdAt: string,
  updatedAt?: string | null,
  deletedAt?: string | null,
  ride: {
      id: string,
      passengerId: string,
      destination: string,
      landmark?: string | null,
      pickupLocation: string,
      notes?: string | null,
      departureTime: {
        departureStart: string,
        departureEnd: string,
      },
      acceptedAt?: string|null,
      createdAt: string,
      updatedAt?: string | null,
      deletedAt?: string | null
    },
  driver: {
    firstName: string,
    lastName: string,
    profileImage: string,
    phoneNumber?: string|null,
    primaryLocation?:string |null,
  },
  passenger: {
    firstName: string,
    lastName: string,
    profileImage: string,
    phoneNumber?:string|null,
  }
}

export interface TripCardProps {
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

export interface AcceptRideProps {
  acceptedAt : string|null; id: string;
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

