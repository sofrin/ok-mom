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

export type taskSchema = z.infer<typeof taskSchema>;
