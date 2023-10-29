import { filteredTasks } from 'entities/CardTask/model/filterTasks';

import { taskSchema } from 'shared/types';

export const GetFilteredChildTasks = (child: string, tasks: taskSchema[]) => {
	const filteredChildTasks = filteredTasks(tasks, child);
	console.log(`filteredChildTasks`, filteredChildTasks);

	const habitTasks = filteredChildTasks.filter(
		(task) => task.taskType === 'habit',
	);
	const dailyTasks = filteredChildTasks.filter(
		(task) => task.taskType === 'daily',
	);
	const todoTasks = filteredChildTasks.filter(
		(task) => task.taskType === 'todo',
	);

	return {
		habitTasks,
		dailyTasks,
		todoTasks,
	};
};
