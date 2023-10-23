import React from 'react';

import { Grid, Typography } from '@mui/material';

import { TaskCardTemplate } from 'shared/ui/TaskCardTemplate/TaskCardTemplate';
import { Item } from 'shared/ui/Item/Item';
import { CardTaskList } from 'entities/CardTask/ui/CardTaskList';
import { filteredArchievedTasks } from 'entities/CardTask/model/filterTasks';
import { useAppSelector } from 'shared/model/hooks';
import { selectTasks } from 'entities/CardTask/model/taskSlice';

type Props = {
	child: string;
};

export const ArchievedTaskCardWidget = ({ child }: Props) => {
	const tasks = useAppSelector(selectTasks);
	const filteredChildTasks = filteredArchievedTasks(tasks);
	return (
		<TaskCardTemplate child={'Задания в архиве'}>
			<Grid
				container
				direction='row'
				item
				spacing={1}
				justifyContent='space-between'
			>
				<Grid
					item
					xs={'auto'}
					md={'auto'}
					sx={{ flexGrow: 0, height: 69 }}
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
				archieved
				child={child}
				filteredTasks={filteredChildTasks}
			/>
		</TaskCardTemplate>
	);
};
