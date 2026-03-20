import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
});

export const emailSchema = z.string().email('Invalid email address');

export const isValidEmail = (email: string): boolean => emailSchema.safeParse(email).success;

export const isValidPassword = (password: string): boolean =>
  z.string().min(6).safeParse(password).success;

export type LoginFormData = z.infer<typeof loginSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
