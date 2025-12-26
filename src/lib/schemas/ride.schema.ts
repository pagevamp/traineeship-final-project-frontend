import { z } from 'zod';

export const createRideRequestSchema = z
  .object({
    pickupLocation: z.string().trim().min(1, 'Pickup location is required'),

    destination: z.string().trim().min(1, 'Destination is required'),

    landmark: z.string().trim().optional(),

    notes: z.string().trim().optional(),

    departureStart: z.date({
      message: 'Earliest departure time is required',
    }),

    departureEnd: z.date({
      message: 'Latest departure time is required',
    }),
  })
  .refine((data) => data.departureEnd > data.departureStart, {
    message: 'Latest departure must be after earliest departure',
    path: ['departureEnd'],
  })
  .refine(
    (data) => {
      const diffMs = data.departureEnd.getTime() - data.departureStart.getTime();
      const diffInMinutes = diffMs / (1000 * 60);
      return diffInMinutes <= 60;
    },
    {
      message: 'Departure time window cannot exceed 1 hour',
      path: ['departureEnd'],
    },
  );

export type CreateRideRequestActionState = {
  form?: {
    pickupLocation?: string;
    destination?: string;
    landmark?: string;
    notes?: string;
    departureStart?: Date | null;
    departureEnd?: Date | null;
  };
  errors?: {
    pickupLocation?: string;
    destination?: string;
    departureStart?: string;
    departureEnd?: string;
    landmark?: string;
    notes?: string;
    server?: string;
  };
};
