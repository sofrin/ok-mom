import { Grid, Paper } from '@mui/material';
import { filteredTasks } from 'entities/CardTask/model/filterTasks';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import Chart from 'entities/Chart/Chart';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';

export const ParentStatistics = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchTasks = async () => {
			await dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);
	const firstChildTasks = filteredTasks(tasks, 'Ребёнок 1');
	const secondChildTasks = filteredTasks(tasks, 'Ребёнок 2');
	const children = [
		{ name: 'Ребёнок 1', tasks: firstChildTasks },
		{ name: 'Ребёнок 2', tasks: secondChildTasks },
	];
	console.log(`firstChildTasks`, firstChildTasks);
	console.log(`secondChildTasks`, secondChildTasks);
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
									<Chart
										key={child.name}
										tasks={child.tasks}
										child={child.name}
									/>
								</Grid>
							))}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
