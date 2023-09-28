import { taskSchema } from 'src/shared/types';

export const points = (filteredTasks: taskSchema[]) => {
	return filteredTasks.reduce(
		(a: number, obj: taskSchema) => a + obj.points,
		0,
	);
};

export const progressValue = (filteredTasks: taskSchema[]) => {
	return points(filteredTasks) * 0.1;
};
