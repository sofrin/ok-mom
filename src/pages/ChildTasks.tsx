import { Grid } from '@mui/material';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import { GetFilteredChildTasks } from 'widgets/ChildViewTaskCard/model/filters';
import { ChildViewTasksCol } from 'widgets/ChildViewTasksCol';

export const ChildTasks = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);

	console.log(tasks);

	const { habitTasks, todoTasks, dailyTasks } = GetFilteredChildTasks(
		'Ребёнок 1',
		tasks,
	);
	console.log('habitTasks', habitTasks, 'todo', todoTasks, 'daily', dailyTasks);

	return (
		<>
			<Grid
				container
				spacing={2}
			>
				<ChildViewTasksCol
					tasksList={habitTasks}
					colTitle='Привычки'
				/>
				<ChildViewTasksCol
					tasksList={todoTasks}
					colTitle='Задания'
				/>
				<ChildViewTasksCol
					tasksList={dailyTasks}
					colTitle='Ежедневные задания'
				/>
			</Grid>
		</>
	);
};
