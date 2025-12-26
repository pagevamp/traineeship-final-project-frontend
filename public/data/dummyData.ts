import { Ride } from "@/core/types/Ride";

export const dummyRide: Ride = {
  id: 'ride123',
  pickupLocation: 'Kathmandu',
  destination: 'Bhaktapur',
  createdAt: new Date().toISOString(),
  acceptedAt: null,
  passengerId: 'passenger123', // required
  passenger: {
    firstName: 'John',
    lastName: 'Doe',
    profileImage: '/profile.jpg',
    phoneNumber: '3456789',
  },
  driver: null,
  status: 'not_started',
  landmark: 'Near City Hall', // required
  notes: 'Handle with care', // required
  departureTime: {
     start: '',
  end: '',
  }, // required
};
