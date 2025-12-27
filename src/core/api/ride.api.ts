import axiosInstance from '@/lib/private-axios';
import { Ride, RideSchema } from '../types/Ride';
import { z } from 'zod';

export async function getRides(): Promise<Ride[]> {
  try {
    const res = await axiosInstance.get('/ride-requests');

    const result = z.array(RideSchema).safeParse(res.data.rides);

    console.log(result);

    if (!result.success) {
      console.error('[Zod Validation Error]:', result.error.format());
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}
