import z from 'zod';

export interface DepartureTime {
  start: string;
  end: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  profileImage: string;
  phoneNumber: string | null;
}

export interface Driver {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
}

export type RideStatus = 'not_started' | 'on_the_way' | 'at_pickup' | 'reached';

export interface Ride {
  id: string;
  passengerId: string;
  destination: string;
  landmark: string | null;
  driver: Driver | null;
  status: RideStatus;
  pickupLocation: string;
  notes: string | null;
  departureTime: DepartureTime;
  acceptedAt: string | null;
  passenger: Passenger;
  createdAt: string;
}

export type RideTab = 'all' | 'mine';

export const RideRequestItemSchema = z.object({
  id: z.string(),
  passenger_id: z.string(),
  destination: z.string(),
  landmark: z.string().nullable,
  driver: z.string().nullable(),
  status: z.string(),
  notes: z.string().nullable(),
  pickup_location: z.string(),
  departure_time: z.string(),
  acceptedAt: z.string().nullable(),
  created_at: z.string(),
});

export type RideRequestItem = z.infer<typeof RideRequestItemSchema>;
