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
	id: z.number().default(0),
	isCompleted: z.enum(['true', 'false']).default('false'),
	isArchived: z.enum(['true', 'false']).default('false'),
	completedAt: z.date().optional(),
	createdAt: z.date().optional(),
	parent_id: z.number().optional(),
});
export const registerChildSchema = z
	.object({
		id: z.number().default(0),
		login: z.string(),
		email: z.string().email(),
		password: z.string(),
		confirmPassword: z.string(),
		parent_id: z.number().default(0),
		role: z.literal('child').default('child'),
		balance: z.number().default(0),
		goal: z.number().default(100),
		name: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});
export const registerParentSchema = z
	.object({
		role: z.literal('parent').default('parent'),
		children: z
			.array(
				z.object({
					id: z.number().default(0),
					login: z.string(),
					email: z.string().email(),
					password: z.string(),
					confirmPassword: z.string(),
					parent_id: z.number(),
					role: z.literal('child'),
					balance: z.number().default(0),
					goal: z.number().default(100),
					name: z.string(),
				}),
			)
			.default([]),
		id: z.number().default(0),
		login: z.string(),
		email: z.string().email(),
		password: z.string(),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
export const SuggestionSchema = z.object({
	title: z.string(),
	description: z.string(),
	price: z.number(),
});

export type SuggestionSchema = z.infer<typeof SuggestionSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;

export type registerParentSchema = z.input<typeof registerParentSchema>;
export type registerChildSchema = z.input<typeof registerChildSchema>;

export type Child = z.infer<typeof registerChildSchema>;
export type Parent = z.infer<typeof registerParentSchema>;
export type taskSchema = z.infer<typeof taskSchema>;
