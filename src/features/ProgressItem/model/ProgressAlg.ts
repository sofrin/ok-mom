import { taskSchema } from 'shared/types';

export const points = (filteredTasks: taskSchema[]) => {
	return filteredTasks.reduce(
		(a: number, obj: taskSchema) => a + obj.points,
		0,
	);
};

export const progressValue = (filteredTasks: taskSchema[], goal: number) => {
	return (points(filteredTasks) / goal) * 100;
};
