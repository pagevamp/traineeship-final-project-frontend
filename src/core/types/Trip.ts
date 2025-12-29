import { z } from 'zod';
import { RideSchema } from './Ride';

export const DriverSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().url(),
  phoneNumber: z.string().nullable(),
  primaryLocation: z.string().nullable(),
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
});

export type Trip = z.infer<typeof TripSchema>;
