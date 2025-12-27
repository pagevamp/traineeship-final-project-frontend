import z from 'zod';

export const DepartureTimeSchema = z.object({
  departureStart: z.string(),
  departureEnd: z.string(),
});

export const PassengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().url(),
  phoneNumber: z.string().nullable(),
});

export const RideSchema = z.object({
  id: z.string(),
  passengerId: z.string(),
  destination: z.string(),
  landmark: z.string().nullable(),
  pickupLocation: z.string(),
  notes: z.string().nullable(),
  acceptedAt: z.string().nullable(),
  createdAt: z.string(),
  passenger: PassengerSchema,
  departureTime: z.preprocess((val) => {
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) {
          return {
            departureStart: parsed[0],
            departureEnd: parsed[1],
          };
        }
      } catch {
        return val;
      }
    }
    return val;
  }, DepartureTimeSchema),
});

export type Ride = z.infer<typeof RideSchema>;
export type Passenger = z.infer<typeof PassengerSchema>;
export type DepartureTime = z.infer<typeof DepartureTimeSchema>;

export interface RideDTO extends Omit<Ride, 'departureTime' | 'status'> {
  departureTime: string;
  status: string;
}

export type RideTab = 'all' | 'mine';
