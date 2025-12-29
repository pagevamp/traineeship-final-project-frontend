import axiosInstance from '@/lib/private-axios';
import { Trip, TripSchema } from '../types/Trip';
import { z } from 'zod';

export async function getAcceptedTrips(): Promise<Trip[]> {
  try {
    const res = await axiosInstance.get('/trips/accepted');

    const tripsData = res.data.data;

    if (!tripsData) return [];

    const normalizedData = Array.isArray(tripsData) ? tripsData : [tripsData];

    const result = z.array(TripSchema).safeParse(normalizedData);

    if (!result.success) {
      throw new Error('Data corruption: Trip response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}
