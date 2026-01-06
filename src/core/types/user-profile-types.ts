import z from 'zod';

const NEPAL_PHONE_REGEX = /^\+977\d{10}$/;

export const UpdateProfileSchema = z.object({
  
  contactNumber: z
  .string()
  .regex(NEPAL_PHONE_REGEX, {
    message: 'Phone number must start with +977 and contain exactly 10 digits after it',
  }),

  primaryLocation: z.string().trim().min(2, 'Primary location is required').max(100, 'Primary location cannot exceed 100 characters'),
});

export type UpdateProfileForm = z.infer<typeof UpdateProfileSchema>;

export type UpdateProfileActionState = {
  form?: {
    contactNumber?: string;
    primaryLocation?: string;
  };
  errors?: {
    contactNumber?: string;
    primaryLocation?: string;
    server?: string;
  };
};
