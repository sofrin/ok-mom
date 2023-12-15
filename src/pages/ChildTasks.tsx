import { Grid } from '@mui/material';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import React from 'react';
import { useAppDispatch, useAppSelector, useGetUserInfo } from 'shared/model/hooks';
import { GetFilteredChildTasks } from 'widgets/ChildViewTaskCard/model/filters';
import { ChildViewTasksCol } from 'widgets/ChildViewTasksCol';

export const ChildTasks = () => {
	const dispatch = useAppDispatch();
	const { parent_id, username } = useGetUserInfo();
	React.useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk({ str: '', parent_id: parent_id })).unwrap();
		};
		fetchTasks();
	}, [dispatch, parent_id]);
	const tasks = useAppSelector(selectTasks);

	console.log(tasks);

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
