import { z } from 'zod';

export const taskSchema = z.object({
	child: z.string(),
	title: z.string(),
	points: z.number(),
	taskType: z.string(),
	description: z.string(),
	priority: z.string(),
	date: z.string().optional(),
	tags: z.string().optional(),
	id: z.string().default('0'),
	isCompleted: z.string().default('false'),
	isArchived: z.string().default('false'),
});
export const registerSchema = z
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
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(10, 'Password must be atleast 10 characters'),
});
//todo поменять юзера
export interface User {
	first_name: string;
	last_name: string;
}

export type LoginSchema = z.infer<typeof LoginSchema>;

export type registerSchema = z.infer<typeof registerSchema>;

export type taskSchema = z.infer<typeof taskSchema>;
