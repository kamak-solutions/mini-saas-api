import { z } from 'zod';

export const signupSchema = z.object({
  tenantName: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const inviteSchema = z.object({
  email: z.string().email(),
});