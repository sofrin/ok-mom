import { z } from 'zod';

export const signUpSchema = z
	.object({
		login: z.string(),
		email: z.string().email(),
		password: z.string().min(10, 'Password must be atleast 10 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

export type signUpSchema = z.infer<typeof signUpSchema>;
