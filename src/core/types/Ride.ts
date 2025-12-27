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

export const CreateRideApiSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  landmark: z.string().nullable(),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  notes: z.string().nullable(),
  departureStart: z.string(),
  departureEnd: z.string(),
});

export const CreateRideSchema = z
  .object({
    destination: z.string().trim().min(1, 'Destination is required'),
    pickupLocation: z.string().trim().min(1, 'Pickup location is required'),
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
  .refine((data) => data.departureStart > new Date(), {
    message: 'Departure must be in future',
    path: ['departureStart'],
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

export type CreateRideRequest = z.infer<typeof CreateRideApiSchema>;
export type CreateRideActionState = {
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

export type Ride = z.infer<typeof RideSchema>;
export type Passenger = z.infer<typeof PassengerSchema>;
export type DepartureTime = z.infer<typeof DepartureTimeSchema>;

export interface RideDTO extends Omit<Ride, 'departureTime' | 'status'> {
  departureTime: string;
  status: string;
}

export type RideTab = 'all' | 'mine';
