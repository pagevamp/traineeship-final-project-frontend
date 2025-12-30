import z from 'zod';
import { TripStatus, VehicleType } from '../types/trip-types';

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
  primaryLocation: z.string().nullable().optional(),

});


export const RideSchema = z.object({
  id: z.string(),
  passengerId: z.string(),
  destination: z.string(),
  landmark: z.string().nullable(),
  pickupLocation: z.string().nullable(),
  notes: z.string().nullable(),
   departureTime: z.preprocess((val) => {
      if (typeof val === 'string') {
        const dates = val.replace(/[\[\]"]/g, '').split(',');
        if (dates.length === 2) {
          return {
            departureStart: dates[0].trim(),
            departureEnd: dates[1].trim(),
          };
        }
      }
      return val;
    }, DepartureTimeSchema),
  acceptedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
});

export const TripSchema = z.object({
  id: z.string(),
  driverId: z.string(),
  status: z.enum(TripStatus),
  vehicleType: z.enum(VehicleType),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),  
  
  ride:RideSchema,
  driver: DriverSchema,
  passenger: PassengerSchema,
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




