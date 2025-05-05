
import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  username: z.string().optional(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
