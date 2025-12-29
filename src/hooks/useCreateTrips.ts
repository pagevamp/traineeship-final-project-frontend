// 'use client';

// import { useState } from 'react';
// import {
//   CreateRideActionState,
// } from '@/core/types/Ride';
// import { useSWRConfig } from 'swr';
// import { createRide, updateRide } from '@/core/api/ride.api';
// import { toast } from 'sonner';
// import { Trip } from '@/core/schema/trip.schema';

// export const useCreatetRIPS = (trip?: Trip | null) => {
//   const { mutate } = useSWRConfig();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<CreateRideActionState['errors']>({});



//   const handleSubmit = async (e: React.FormEvent, onClose: () => void) => {
//     e.preventDefault();
//     if (!handleValidation()) return;

//     try {
//       setLoading(true);

//       const metadata = {
//         destination: formData.destination,
//         pickupLocation: formData.pickupLocation,
//         landmark: formData.landmark || null,
//         notes: formData.notes || null,
//       };

//       if (ride) {
//         toast.promise(updateRide(ride.id, metadata), {
//           loading: 'Saving changes...',
//           success: (res) => {
//             mutate('ride-requests/me/pending');
//             onClose();
//             return res.message;
//           },
//           error: (err) => {
//             const msg = err?.response?.data?.message || 'Update failed';
//             setError((prev) => ({ ...prev, server: msg }));
//             return msg;
//           },
//         });
//       } else {
//         const payload: CreateTrip = {
//           ...metadata,
//           departureStart: formData.departureStart!.toISOString(),
//           departureEnd: formData.departureEnd!.toISOString(),
//         };

//         toast.promise(createRide(payload), {
//           loading: 'Posting ride request...',
//           success: () => {
//             mutate('ride-requests/me/pending');
//             onClose();
//             return 'Ride requested successfully!';
//           },
//           error: (err) => {
//             const msg = err?.response?.data?.message || 'Request failed';
//             setError((prev) => ({ ...prev, server: msg }));
//             return msg;
//           },
//         });
//       }
//     } catch (err) {
//       console.error('Submission Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     setLoading,
//     error,
//     setError,
//     handleSubmit,
//   };
// };
