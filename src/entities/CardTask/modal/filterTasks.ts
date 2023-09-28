import { taskSchema } from 'src/shared/types';

export const filteredTasks = (tasks: taskSchema[], child: string) => {
	return tasks.filter(
		(obj: taskSchema) =>
			Object.values(obj).includes(child) &&
			!Object.values(obj).includes('true'),
	);
};

export const filteredCompletedTasks = (tasks: taskSchema[]) => {
	return tasks.filter(
		(obj: taskSchema) =>
			obj.isCompleted === 'true' && obj.isArchived !== 'true',
	);
};
export const filteredArchievedTasks = (tasks: taskSchema[]) => {
	return tasks.filter((obj: taskSchema) => obj.isArchived === 'true');
};
