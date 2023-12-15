import { Grid, Paper, Typography } from '@mui/material';
import { childArchievedTasks } from 'entities/CardTask/model/filterTasks';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import Chart from 'entities/Chart/Chart';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from 'shared/model/hooks';

export const ParentStatistics = () => {
	const isAuth = useAuth();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);

	if (!isAuth.user || isAuth.user.role !== 'parent') {
		return <Navigate to='/signIn' />;
	}

	const children = isAuth.user.children.map((child) => {
		return {
			name: child.name,
			tasks: childArchievedTasks(tasks, child.name),
		};
	});
	return (
		<Grid
			container
			sx={{ justifyContent: 'center', alignItems: 'center', height: '70vh' }}
		>
			<Grid
				item
				sx={{
					width: 'fit-content',
				}}
			>
				<Paper
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						width: 'fit-content',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid
						container
						spacing={2}
						justifyContent='center'
						alignItems={'center'}
						direction={'row'}
					>
						{children &&
							children.map((child) => (
								<Grid
									key={child.name}
									sx={{ width: '1000px', height: '300px' }}
									item
								>
									{child.tasks.length == 0 ? (
										<Typography
											variant='h5'
											align='center'
											sx={{ padding: '20px' }}
										>
											Нет выполненных задач
										</Typography>
									) : (
										<Chart
											key={child.name}
											tasks={child.tasks}
											child={child.name}
										/>
									)}
								</Grid>
							))}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
