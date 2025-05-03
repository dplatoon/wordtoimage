
import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
