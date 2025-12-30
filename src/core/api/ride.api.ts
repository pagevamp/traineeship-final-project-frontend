import axiosInstance from '@/lib/private-axios';
import { Ride, RideSchema, CreateRideRequest, CreateRideApiSchema } from '../types/Ride';
import { z } from 'zod';

export async function getRides(): Promise<Ride[]> {
  try {
    const res = await axiosInstance.get('/ride-requests');

    const result = z.array(RideSchema).safeParse(res.data.rides);

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getMyRides(): Promise<Ride[]> {
  try {
    const res = await axiosInstance.get('/ride-requests/me');

    const result = z.array(RideSchema).safeParse(res.data.rides);

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

    if (!result.success) {
      throw new Error('Data corruption: API response does not match frontend types.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getMyRidsStatus(): Promise<boolean> {
  try {
    const res = await axiosInstance.get('/ride-requests/me/pending');

    if (res.data.rides.length === 0) {
      return true;
    }

    return false;
  } catch (error: unknown) {
    throw error;
  }
}

export async function createRide(data: CreateRideRequest): Promise<Ride> {
  try {
    CreateRideApiSchema.parse(data);

    const res = await axiosInstance.post('/ride-requests', data);
    const result = RideSchema.safeParse(res.data);

    if (!result.success) {
      throw new Error('Server returned an invalid ride object after creation.');
    }

    return result.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function deleteRide(id: string) {
  try {
    await axiosInstance.delete(`/ride-requests/${id}`);
  } catch (error: unknown) {
    throw error;
  }
}
