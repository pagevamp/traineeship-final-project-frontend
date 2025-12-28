import axiosInstance from '@/lib/private-axios';
import {
  Ride,
  RideSchema,
  CreateRideRequest,
  CreateRideApiSchema,
  UpdateRideApiSchema,
  UpdateRideRequest,
} from '../types/Ride';
import { z } from 'zod';

export async function getRides(): Promise<Ride[]> {
  try {
    const res = await axiosInstance.get('/ride-requests');

    const result = z.array(RideSchema).safeParse(res.data.rides);

    console.log(result);

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getMyPendingRides(): Promise<Ride[]> {
  try {
    const res = await axiosInstance.get('/ride-requests/me/pending');

    const result = z.array(RideSchema).safeParse(res.data.rides);

    console.log(result);

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function createRide(data: CreateRideRequest): Promise<Ride> {
  try {
    CreateRideApiSchema.parse(data);

    const res = await axiosInstance.post('/ride-requests', data);
    console.log(res.data);
    const result = RideSchema.safeParse(res.data);

    if (!result.success) {
      throw new Error('Server returned an invalid ride object after creation.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function updateRide(
  id: string,
  data: UpdateRideRequest,
): Promise<{ message: string }> {
  try {
    UpdateRideApiSchema.parse(data);

    const res = await axiosInstance.patch(`/ride-requests/${id}`, data);

    const updateResponseSchema = z.object({
      message: z.string(),
    });
    const result = updateResponseSchema.safeParse(res.data);

    if (!result.success) {
      throw new Error('Update successful, but server returned unexpected response format.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}
