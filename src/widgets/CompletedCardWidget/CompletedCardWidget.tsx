import React from 'react';

import { Grid, Typography } from '@mui/material';

import { points } from 'features/ProgressItem/model/ProgressAlg';
import { TaskCardTemplate } from 'shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Item } from 'shared/ui/Item/Item';
import { CardTaskList } from 'entities/CardTask/ui/CardTaskList';
import { filteredCompletedTasks } from 'entities/CardTask/model/filterTasks';
import { useAppSelector } from 'shared/model/hooks';
import { selectTasks } from 'entities/CardTask/model/taskSlice';

type Props = {
	child: string;
};

export const CompletedTaskCardWidget = ({ child }: Props) => {
	const tasks = useAppSelector(selectTasks);
	const filteredChildTasks = filteredCompletedTasks(tasks);
	const totalPoints = points(filteredChildTasks);

	return (
		<TaskCardTemplate child={'Выполненые задания'}>
			<Grid
				container
				direction='row'
				item
				spacing={0}
				sx={{ flexGrow: 0, height: 50 }}
			>
				<Grid
					item
					xs={'auto'}
					md={'auto'}
				>
					<Item>
						<Typography
							variant='body1'
							component='h3'
						>
							{child}
						</Typography>
					</Item>
				</Grid>
			</Grid>
			<CardTaskList
				completed
				child={child}
				filteredTasks={filteredChildTasks}
			/>
			{/* <Grid
				item
				xs={12}
				sx={{ p: 4, visibility: 'hidden' }}
			>
				<div>Смотреть расписание →</div>
			</Grid> */}
			<Grid
				container
				item
			>
				<Grid
					item
					xs={5}
				>
					<Item>Полученные баллы:{totalPoints}</Item>
				</Grid>
			</Grid>
		</TaskCardTemplate>
	);
};

export default CompletedTaskCardWidget;
