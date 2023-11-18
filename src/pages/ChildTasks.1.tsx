import React from 'react';
import { Chip, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';

import { GetFilteredChildTasks } from 'widgets/ChildViewTaskCard/model/filters';
import { ChildViewTaskCard } from 'widgets/ChildViewTaskCard/ui/ChildViewTaskCard';

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
				<Grid
					item
					xs={6}
					md={4}
					lg={4}
				>
					<Grid
						container
						justifyContent={'flex-start'}
						alignItems={'center'}
						gap={1}
					>
						<Typography variant='h5'>Habits</Typography>
						<Chip
							label={1}
							size='small'
							color='error'
						/>
					</Grid>
					<>
						<Grid
							item
							xs={12}
							md={12}
							lg={12}
						>
							<Paper
								sx={{
									display: 'flex',
									flexDirection: 'column',
									height: 700,
									padding: 2,
								}}
							>
								<Grid
									container
									direction='row'
									spacing={1}
									sx={{
										height: 700,
										alignItems: 'flex-start',
										marginLeft: '-4px',
									}}
								>
									{habitTasks
										? habitTasks.map((task) => (
												<ChildViewTaskCard
													task={task}
													title={task.title}
													description={task.description}
													points={task.points}
													date={task.date}
													key={task.id}
													priority={task.priority}
												/>
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ))
										: null}
								</Grid>
							</Paper>
						</Grid>
					</>
				</Grid>
			</Grid>
		</>
	);
};
