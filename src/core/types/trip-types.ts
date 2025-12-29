
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

export interface TripCardProps {
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

export interface AcceptRideProps {
  acceptedAt?: string|null; 
  id: string;
  onCancel: (id: string) => void;
  onStatusUpdate: (id: string, type: TripStatus) => void;
}

