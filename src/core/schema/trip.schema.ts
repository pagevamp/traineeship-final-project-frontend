import z from 'zod';
import { TripStatus, VehicleType } from '../types/trip-types';
import { RideSchema } from '../types/Ride';

export const DepartureTimeSchema = z.object({
  departureStart: z.string(),
  departureEnd: z.string(),
});


export const PassengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
  primaryLocation: z.string().nullable().optional(),
});

export const DriverSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().nullable().optional(),
  profileImage: z.string().nullable().optional(),
});


export const TripSchema = z.object({
  id: z.string(),
  driverId: z.string(),
  status: z.string(),
  vehicleType: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),  
  
  ride: RideSchema,
  driver: DriverSchema.nullable().optional(),
  passenger: PassengerSchema.nullable().optional()
});


export const CreateTripApiSchema = z.object({
  requestId: z.string().uuid({ message: 'Valid ride request ID is required' }),
  vehicleType: z.enum([VehicleType.TWO_WHEELER, VehicleType.FOUR_WHEELER], {
    message: 'Vehicle type is required and must be valid',
  }),
});

const TripStatusEnum = z.enum([
  TripStatus.NOT_STARTED,
  TripStatus.ON_THE_WAY,
  TripStatus.REACHED_PICKUP,
  TripStatus.REACHED_DESTINATION,
]);

export const UpdateTripSchema = z.object({
  status: TripStatusEnum,
});

export const UpdateTripApiSchema = UpdateTripSchema;


export type CreateTripRequest = z.infer<typeof CreateTripApiSchema>;
export type UpdateTrip = z.infer<typeof UpdateTripApiSchema>;
export type Trip = z.infer<typeof TripSchema>;




