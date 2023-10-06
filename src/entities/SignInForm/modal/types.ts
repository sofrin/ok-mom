import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(10, 'Password must be atleast 10 characters'),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
