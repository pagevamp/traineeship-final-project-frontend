import axiosInstance from '@/lib/private-axios';
import { z } from 'zod';
import { CreateTripApiSchema, CreateTripRequest, Trip, TripSchema, UpdateTrip, UpdateTripApiSchema } from '../schema/trip.schema';

export async function getTrips(): Promise<Trip> {
  try {
    const res = await axiosInstance.get('/trips');

    const result = TripSchema.safeParse(res.data.data.trips);

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getMyPendingTrips(): Promise<Trip[]> {
  try {
    const res = await axiosInstance.get('/trips/me/pending');

    const result = z.array(TripSchema).safeParse(res.data.data.trips.trips);
    console.log('This is pending trips',result)

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function createTrip(data: CreateTripRequest): Promise<Trip> {
  try {
    CreateTripApiSchema.parse(data);

    const res = await axiosInstance.post('/trips', data);
    const result = TripSchema.safeParse(res.data);

    if (!result.success) {
      throw new Error('Server returned an invalid trip object after creation.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function updateTrip(
  id: string,
  data: UpdateTrip,
): Promise<z.infer<typeof TripSchema>> {
  try {
    UpdateTripApiSchema.parse(data);

    const res = await axiosInstance.patch(`/trips/${id}`, data);

    const result = TripSchema.safeParse(res.data);
    if (!result.success) {
      throw new Error('Update successful, but server returned unexpected response format.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function deleteTrips(id: string) {
  try {
    await axiosInstance.delete(`/trips/${id}`);
  } catch (error: unknown) {
    throw error;
  }
}
