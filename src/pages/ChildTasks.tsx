import { Grid } from '@mui/material';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import React from 'react';
import { useAppDispatch, useAppSelector, useAuth } from 'shared/model/hooks';
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
	const isAuth = useAuth();
	let username = '';
	if (isAuth.user?.role === 'child') {
		username = isAuth.user.name;
	}
	if (isAuth.user?.role === 'parent') {
		username = isAuth.user.children[0].name;
	}

	const { habitTasks, todoTasks, dailyTasks } = GetFilteredChildTasks(
		username,
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
