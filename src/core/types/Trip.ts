import { z } from 'zod';
import { PassengerSchema, RideSchema } from './Ride';

export const DriverSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.url(),
  phoneNumber: z.string().nullable().optional(),
  primaryLocation: z.string().nullable().optional(),
});

export const TripSchema = z.object({
  id: z.string(),
  driverId: z.string(),
  status: z.string(),
  vehicleType: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  ride: RideSchema,
  driver: DriverSchema,
  passenger: PassengerSchema,
});

export type Trip = z.infer<typeof TripSchema>;
