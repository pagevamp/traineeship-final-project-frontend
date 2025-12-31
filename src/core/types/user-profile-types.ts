import z from 'zod';

export const UpdateProfileSchema = z.object({
  contactNumber: z
    .string()
    .trim()
    .min(7, 'Contact number is too short')
    .max(20, 'Contact number is too long'),

  primaryLocation: z.string().trim().min(2, 'Primary location is required'),
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
