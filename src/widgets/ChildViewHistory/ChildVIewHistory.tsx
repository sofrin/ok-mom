import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import {
	childArchievedTasks,
	childCompletedTasks,
} from 'entities/CardTask/model/filterTasks';
import { getTasksThunk, selectTasks } from 'entities/CardTask/model/taskSlice';
import { HistoryChildCard } from 'entities/HistoryChildCard/HistoryChildCard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model/hooks';
import { taskSchema } from 'shared/types';

export const ChildVIewHistory = ({ child }: { child: string }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const fetchTasks = async () => {
			dispatch(getTasksThunk('')).unwrap();
		};
		fetchTasks();
	}, [dispatch]);
	const tasks = useAppSelector(selectTasks);
	const archievedTasks = childArchievedTasks(tasks, child);
	const completedTasks = childCompletedTasks(tasks, child);
	const [parent] = useAutoAnimate();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				width: 'auto',
				height: '700px',
				overflowY: 'auto',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '400px',
				}}
			>
				<Typography
					variant='h5'
					sx={{ marginBottom: '10px' }}
				>
					Задания на проверке:
				</Typography>
				<List
					ref={parent}
					disablePadding
				>
					{completedTasks.map((obj: taskSchema) => (
						<ListItem
							disablePadding
							key={obj.id}
							sx={{ width: 400 }}
						>
							<HistoryChildCard {...obj} />
						</ListItem>
					))}
				</List>
			</Box>

			<Box sx={{ height: 'auto', margin: '0 30px' }}>
				<Divider orientation='vertical' />
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '400px',
				}}
			>
				<Typography
					variant='h5'
					sx={{ marginBottom: '10px' }}
				>
					Подтвержденные задания:
				</Typography>
				<List
					ref={parent}
					disablePadding
				>
					{archievedTasks.map((obj: taskSchema) => (
						<ListItem
							disablePadding
							key={obj.id}
							sx={{ width: 400 }}
						>
							<HistoryChildCard {...obj} />
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};
