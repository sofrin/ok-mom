import { taskSchema } from 'shared/types';

export const filteredTasks = (tasks: taskSchema[], child: string) => {
	return tasks.filter(
		(obj: taskSchema) =>
			obj.child === child &&
			obj.isCompleted === 'false' &&
			obj.isArchived === 'false',
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
export const childArchievedTasks = (tasks: taskSchema[], child: string) => {
	return tasks.filter(
		(obj: taskSchema) => obj.child === child && obj.isArchived === 'true',
	);
};
export const childCompletedTasks = (tasks: taskSchema[], child: string) => {
	return tasks.filter(
		(obj: taskSchema) =>
			obj.child === child &&
			obj.isCompleted === 'true' &&
			obj.isArchived === 'false',
	);
};
