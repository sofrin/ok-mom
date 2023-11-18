import { z } from 'zod';

export const taskSchema = z.object({
	child: z.string(),
	title: z.string(),
	points: z.number(),
	taskType: z.enum(['daily', 'todo', 'habit']),
	description: z.string(),
	priority: z.enum(['low', 'mid', 'high', 'critical']).default('mid'),
	date: z.string().optional(),
	tags: z.string().optional(),
	id: z.string().default('0'),
	isCompleted: z.enum(['true', 'false']).default('false'),
	isArchived: z.enum(['true', 'false']).default('false'),
	completedAt: z.date().optional(),
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
export const SuggestionSchema = z.object({
	title: z.string(),
	description: z.string(),
	price: z.number(),
});

export type SuggestionSchema = z.infer<typeof SuggestionSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;

export type registerSchema = z.infer<typeof registerSchema>;

export type taskSchema = z.infer<typeof taskSchema>;
